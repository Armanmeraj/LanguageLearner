import { Account } from './Account.js';

export class Server {

    constructor() {
        if (!localStorage.getItem('accounts')) {
            localStorage.setItem('accounts', JSON.stringify([]));
        }
    }

    saveAccount(account) {
        const accounts = this.getAccounts();
        const existingAccountIndex = accounts.findIndex(acc => acc.username === account.username);
        if (existingAccountIndex > -1) {
            accounts[existingAccountIndex] = account; // Update existing account
        } else {
            accounts.push(account); // Add new account
        }
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    getAccounts() {
        const accountsData = JSON.parse(localStorage.getItem('accounts')) || [];
        return accountsData.map(accountData => new Account(
            accountData.firstName,
            accountData.lastName,
            accountData.username,
            accountData.password,
            accountData.languagePreference,
            accountData.wordBank
        ));
    }

    getAccountByUsername(username) {
        const accounts = this.getAccounts();
        return accounts.find(account => account.username === username) || null;
    }

    deleteAccount(username) {
        let accounts = this.getAccounts();
        accounts = accounts.filter(account => account.username !== username);
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    updateAccount(username, updatedAccount) {
        const accounts = this.getAccounts();
        const accountIndex = accounts.findIndex(account => account.username === username);
        if (accountIndex > -1) {
            accounts[accountIndex] = updatedAccount;
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
    }
}
