import { Events } from './Events.js';
import { WelcomePage } from './login.js';

export class App {

    #mainViewElm = null;
    #welcomeViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render(root) {


        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        this.#mainViewElm = document.createElement('div');
        this.#mainViewElm.id = 'main-view';

        rootElm.appendChild(this.#mainViewElm);

        const WelcomeView = new WelcomePage();
        this.#welcomeViewElm = await WelcomeView.render()
        this.#navigateTo('welcome')
    }

    #navigateTo(view) {
        this.#mainViewElm.innerHTML = '';
        if (view === 'welcome') {
          this.#mainViewElm.appendChild(this.#welcomeViewElm);
          window.location.hash = view;
        } 
      }
}
