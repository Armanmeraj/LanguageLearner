// Make RESTful API with PouchDB
import { Account } from './Account.js';

export class Server {

    #server = null;
    #account = null;
    #view = null;
    #loginStatus = null;

    constructor() {
        this.#server = new PouchDB('visit');
        console.log('PouchDB is ready');
    }

    async visited() {
        return (await this.findAccount() !== null) && (await this.findView() !== null);
    }

    async restore() {
        try {
            const accountData = await this.findAccount();
            if (accountData) {
                this.#account = new Account(
                    accountData.firstName,
                    accountData.lastName,
                    accountData.username,
                    accountData.password,
                    accountData.languagePreference
                );
            }
            this.#view = await this.findView();
            if (this.#view === null) {
                this.updateView('welcome');
                this.#view = 'welcome';
            }

            this.#loginStatus = await this.findLoginStatus();
            if (this.#loginStatus === null) {
                this.confirmLogin('false');
                this.#loginStatus = 'false';
            }
        } catch (error) {
            console.log(error);
        }
        // If there is no saved information to restore, default account to null and view to 'welcome' and loginStatus to 'false'
    }

    async findAccount() {
        try {
            const accountDoc = await this.#server.get('account');
            return JSON.parse(accountDoc.content); // Turn to object
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async deleteAccount() {
        try {
            const accountDoc = await this.#server.get('account');
            await this.#server.remove(accountDoc);
        } catch (error) {
            console.log(error);
        }
    }

    async saveAccount(account) {
        try {
            // Remove existing account if it exists
            if (await this.findAccount() !== null) {
                await this.deleteAccount();
            }
            // Store the account object as a stringified JSON in the database
            await this.#server.put({
                _id: 'account',
                content: JSON.stringify(account)
            });
            this.#account = account; // Update the local instance

            // await this.confirmLogin('true');
        } catch (error) {
            console.log(error);
        }
    }

    async findView() {
        try {
            const viewDoc = await this.#server.get('view');
            console.log("Found view document: ", viewDoc);
            return viewDoc.view; // Turn to object?
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async updateView(view) {
        try {
            const viewDoc = await this.#server.get('view').catch(err => {
                if (err.status === 404) {
                    // Document not found, so create a new one
                    return null;
                } else {
                    throw err;
                }
            });

            if (viewDoc) {
                // Update existing view document
                viewDoc.view = view;
                await this.#server.put(viewDoc);
            } else {
                // Create a new view document
                await this.#server.put({
                    _id: 'view',
                    view: view
                });
            }

            this.#view = view; // Update local instance
        } catch (error) {
            console.log(error);
        }
    }

    async findLoginStatus() {
        try {
            const loginStatusDoc = await this.#server.get('loginStatus');
            return loginStatusDoc.status;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async confirmLogin(status) {
        try {
            const loginDoc = await this.#server.get('loginStatus').catch(err => {
                if (err.status === 404) {
                    // Document not found, so create a new one
                    return { _id: 'loginStatus', status: status };
                } else {
                    throw err;
                }
            });
    
            loginDoc.status = status;
            await this.#server.put(loginDoc);
    
            this.#loginStatus = status; // Update local instance
        } catch (error) {
            console.log("Error confirming login: ", error);
        }
    }

    destroy() {
        this.#server.destroy().then(() => {
            console.log('Database destroyed');
        }).catch((err) => {
            console.log(err);
        });
    }

    // Functions to interact with MySql database

    async createAccount(account) {
        try {
            const response = await fetch(`http://127.0.0.1:3000/accounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({
                //     firstname: firstname,
                //     lastname: lastname,
                //     user: username,
                //     pass: password,
                //     lang: language
                // })
                body: JSON.stringify({
                    firstname: account.firstName,
                    lastname: account.lastName,
                    user: account.username,
                    pass: account.password,
                    lang: account.languagePreference
                })
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async readAccount(username) {
        try {
            const response = await fetch(`http://127.0.0.1:3000/accounts?user=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error (readAccount)! status: ${response.status}`);
            }
            const foundAccount = await response.json();
            return new Account(foundAccount.firstname, foundAccount.lastname, foundAccount.user, foundAccount.pass, foundAccount.lang);
        } catch (error) {
            console.log(error);
        }
    }
}
