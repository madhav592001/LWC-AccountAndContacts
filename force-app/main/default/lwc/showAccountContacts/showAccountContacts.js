import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import SendAccount from '@salesforce/messageChannel/SendAccount__c';
import fetchContacts from '@salesforce/apex/FetchAccounts.fetchContacts';

export default class ShowAccountContacts extends LightningElement {

    subscription = null ;
    @wire(MessageContext) messageContext;
    accountId;
    accountName;
    contacts;
    hasContact;

    connectedCallback() {
        if(!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                SendAccount,
                (details) => {
                    this.accountId = details.accountId;
                    this.accountName = details.accountName;
                    this.getContacts();
                }
            );
        }
    }

    async getContacts() {
        try {
            this.contacts = await fetchContacts({accountId: this.accountId});
            this.hasContact = this.contacts.length > 0;
        }catch (error) {
            console.error('Error fetching contacts: ', error);
        }
        console.log('contacts'+this.contacts)
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}