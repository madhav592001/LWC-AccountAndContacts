import { api, LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/FetchAccounts.fetchAccounts';
import { MessageContext, publish } from 'lightning/messageService';
import SendAccount from '@salesforce/messageChannel/SendAccount__c';

export default class AccountChild2 extends LightningElement {
    @api searchAccountText;
    currentId;
    currentName;
    @wire(MessageContext) messageContext;

    @wire(getAccounts, {searchAccountText: '$searchAccountText'}) accountRecords;

    columns = [
        { label: 'Id', fieldName: 'Id'},
        { label: 'Name', fieldName: 'Name'},
        { label: 'Actions', fieldName: 'Actions', type: 'button', typeAttributes: { label: 'View Contacts', value: 'view_contacts', variant: 'base' } }
    ]

    handleRowAction(event) {
        if(event.detail.action.value === 'view_contacts') {
            this.currentId = event.detail.row.Id;
            this.currentName = event.detail.row.Name;

            const payload = {
                accountId: this.currentId,
                accountName: this.currentName
            }

            publish(this.messageContext, SendAccount, payload)
        }
    }
}