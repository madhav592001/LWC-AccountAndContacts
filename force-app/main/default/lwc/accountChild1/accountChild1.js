import { LightningElement } from 'lwc';

export default class AccountChild1 extends LightningElement {
    searchAccountText;

    handleSearchAccountTextChange(event) {
        this.searchAccountText = event.target.value;
    }

    handleSearchAccountText() {
        const searchEvent = new CustomEvent('search', {
            detail: { searchAccountText: this.searchAccountText }
        });
        this.dispatchEvent(searchEvent);
        console.log('search event dispaatched with text:', this.searchAccountText);
    }
}