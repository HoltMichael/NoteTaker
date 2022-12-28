import { LightningElement } from 'lwc';

export default class NoteTaker extends LightningElement {
    hashTagging = false;
    recordTagging = false;

    recordSearch = '';
    recordSearchLength = 0;

    relatedRecords = [{}];
    
    handleInput(event){
        if(event.keyCode === 35){
            this.hashTagging = true;
        }else if(event.keyCode === 64){
            this.recordTagging = true;
            const editor = this.template.querySelector('lightning-input-rich-text');
            editor.setRangeText("|",null, null, 'end');
            editor.setRangeText("|@");
        }

        if(this.recordTagging){
            //Empy LIRT string = <p></p>
            //A delay of 1ms is enough to register the new character in the input, otherwise we will lag one character behind
            this.delayTimeout = setTimeout(() => {
                let currentText = this.template.querySelector('lightning-input-rich-text').value;
                let start = currentText.indexOf("\|@") + 2;
                let end = currentText.indexOf("\|@", start);
                this.recordSearch = currentText.substring(start, end);
            }, 1);
        }
    }

    handleRecordSelected(event){
        this.insertText(event.detail.label, event.detail.id);
        this.addRelatedRecord(event.detail.label, event.detail.id);

    }

    insertText(text, id){
        const editor = this.template.querySelector('lightning-input-rich-text');
        var caretPos = editor.value.indexOf("\|@");
        
        //Set the selected record text to be in the position of the caret, minus the first letter, @ and | symbols (3) and over the following |@
        editor.setRangeText(text.trim(), caretPos -3, this.recordSearch.length + caretPos +1, 'select');
        this.template.querySelector('lightning-input-rich-text').setFormat({ link: '/'+id });

        this.recordSearch = '';
        this.recordTagging = false;
    }

    addRelatedRecord(text, id){
        console.log('here');
        this.relatedRecords.push({recordText: text, recordId: id});
        this.relatedRecords.forEach(record => {
            console.log('record');
            console.log(record.recordText);
            console.log(record.recordId);
        })
    }
}