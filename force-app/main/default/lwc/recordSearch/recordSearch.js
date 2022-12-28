import { api, wire, LightningElement } from 'lwc';
import findRecords from '@salesforce/apex/NoteTakerUtils.findRecords';

export default class RecordSearch extends LightningElement {
    @api searchterm;
    results = [];

    @wire (findRecords, {searchTerm: '$searchterm'}) 
    WiredRecords({error, data}){
        if(data){
            'console.log(data)';
            this.results = [];
            data.forEach(object => {
                object.recordList.forEach(record => {
                    let recordSummary = '';
                    let recordId = ''
                    for(const property in record){
                        if(property != 'Id'){
                            recordSummary += `${record[property]}` + " ";
                        }else{
                            recordId = `${record[property]}`
                        }
                    }
                    this.results.push({label: recordSummary, id: recordId, icon: object.iconName});
                })
            });
        }else if(error){
            console.log(error);
        }

        this.results.forEach(record => {
            console.log('record');
            console.log(record);
        })

        console.log(4);
        console.log(JSON.stringify(this.results));
    }
}