export class MainPage {

    #mainPageView = null;
    #server = null;
    #account = null;

    constructor(server, account) {
        this.#server = server;
        this.#account = account;
    }

    async render() {

        this.#mainPageView = document.createElement('div');
        this.#mainPageView.innerHTML = `
            <h1>Main Page</h1>
            <p>Name: ${this.#account.firstName} ${this.#account.lastName}</p>
            <p>Username: ${this.#account.username}</p>
            <p>Language Preference: ${this.#account.languagePreference}</p>
        `;

        return this.#mainPageView;
    }
}