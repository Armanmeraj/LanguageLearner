export class Home {

    #mainPageView = null;
    #server = null;
    #account = null;
    #converseView = null;

    constructor(server) {
        this.#server = server;
    }

    async render() {
        // Fetch the account data from the server
        this.#account = await this.#server.findAccount();

        if (this.#account) {
            this.#mainPageView = document.createElement('div');
            this.#mainPageView.innerHTML = `
                <h1 style="color:black;">Main Page</h1>
                <p style="color:black;">Name: ${this.#account.firstName} ${this.#account.lastName}</p>
                <p style="color:black;">Username: ${this.#account.username}</p>
            `;
        } else {
            console.error('No account data found.');
            this.#mainPageView = document.createElement('div');
            this.#mainPageView.innerHTML = `
                <h1 style="color:black;">Main Page</h1>
                <p style="color:black;">Account information not found. Please log in.</p>
            `;
        }

        return this.#mainPageView;
    }
}

