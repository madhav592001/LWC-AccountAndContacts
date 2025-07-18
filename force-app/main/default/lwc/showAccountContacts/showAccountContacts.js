import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { api, LightningElement, track, wire } from 'lwc';
import SendAccount from '@salesforce/messageChannel/SendAccount__c';
import fetchContacts from '@salesforce/apex/FetchAccounts.fetchContacts';

export default class ShowAccountContacts extends LightningElement {

    subscription = null ;
    @wire(MessageContext) messageContext;
    accountId;
    accountName;
    contacts;
    hasContact;
    addContactModalOpen = false;
    editContactModalOpen = false;
    @api recordId;
    contactIdToEdit;

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

    handleAddContactClick(event) {
        this.addContactModalOpen = true;
    }

    closeContactModal(event) {
        this.addContactModalOpen = false;
    }

    handleAddContactSuccess(event) {
        this.addContactModalOpen = false;
        this.editContactModalOpen = false;
        this.getContacts();
    }

    handleEditContactClick(event) {
        this.contactIdToEdit = event.target.dataset.contactId;
        this.editContactModalOpen= true;
    }

    closeEditModal(event) {
        this.editContactModalOpen = false;
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}