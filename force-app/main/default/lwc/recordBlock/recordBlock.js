import { LightningElement, api } from 'lwc';

export default class RecordBlock extends LightningElement {
    @api recname;
    @api recid;
}