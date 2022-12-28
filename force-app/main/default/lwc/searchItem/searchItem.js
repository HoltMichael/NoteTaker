import { api, LightningElement } from 'lwc';

export default class SearchItem extends LightningElement {
    @api record;

    /*
        Send a note to the parent component(s) to indicate that an item has been selected
        bubble:true sends the note up the component hierarchy in the parent to the top-most <template> tag but won't go any further
        composed:true allows the event to go outside of the parent component and further up the component hierarchy. Ultimately this event is captured by NoteTaker.js 
        to insert the text and grab the record id
    */
    handleClick(){
        const evt = new CustomEvent('recordselected', {
            detail: {id: this.record.id, label:this.record.label},
            bubbles:true,
            composed:true
        });
        this.dispatchEvent(evt);
    }
}