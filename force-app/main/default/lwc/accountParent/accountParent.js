import { LightningElement } from 'lwc';

export default class AccountParent extends LightningElement {
    searchAccountText = '';

    handleSearchAccountText(event) {
        this.searchAccountText = event.detail.searchAccountText;
    }
}