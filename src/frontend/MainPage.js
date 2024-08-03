// import { Converse } from "./Converse";
import { Memorize } from "./Memorize";
// import { Revise } from "./Revise";

export class MainPage {

    #mainPageView = null;
    #server = null;
    #account = null;
    #converseView = null;

    constructor(server, account) {
        this.#server = server;
        this.#account = account;
    }

    async render() {

        this.#mainPageView = document.createElement('div');
        // this.#mainPageView.innerHTML = `
        //     <h1>Main Page</h1>
        //     <p>Name: ${this.#account.firstName} ${this.#account.lastName}</p>
        //     <p>Username: ${this.#account.username}</p>
        //     <p>Language Preference: ${this.#account.languagePreference}</p>
        // `;

        // const converse = new Converse();
        // this.#converseView = await converse.render();
        // this.navigateTo('converseView');

        return this.#mainPageView;
    }
    // navigateTo(view) {
    //     this.#mainPageView.innerHTML = '';
    //     if (view === 'converseView') {
    //       this.#mainPageView.appendChild(this.#mainPageView);
    //       window.location.hash = view;
    //     } 
    //     else if (view === 'reviseView') {
    //         const reviseView = new Revise(this.#server);
    //         reviseView.render().then(reviseView => {
    //             this.#mainPageView.appendChild(reviseView);
    //             window.location.hash = view;
    //         });
    //     }
    //     else if (view === 'memorizeView') {
    //         const memorizeView = new Memorize();
    //         memorizeView.render().then(memorizeView => {
    //             this.#mainPageView.appendChild(memorizeView);
    //             window.location.hash = view;
    //         });
    //     }
    // }
}