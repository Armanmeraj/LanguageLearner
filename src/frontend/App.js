import { WelcomePage } from './login.js';
import { AccountSetup } from './AccountSetup.js'
import { Server } from './Server.js';
import { MainPage } from './MainPage.js';
import { AboutView } from './AboutView.js';
import { TheScienceView } from './TheScienceView.js';
import { NavBar } from './NavBar.js';


export class App {

    #mainViewElm = null;
    #welcomeViewElm = null;
    #server = null;

    constructor(server) {
        this.#server = server;
    }

    async render(root) {


        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        this.#mainViewElm = document.createElement('div');
        this.#mainViewElm.id = 'main-view';

        rootElm.appendChild(this.#mainViewElm);

        const WelcomeView = new WelcomePage(this.#server);
        this.#welcomeViewElm = await WelcomeView.render()
        this.navigateTo('welcome')
    }

    navigateTo(view, account = null) {
        this.#mainViewElm.innerHTML = '';
        if (view === 'welcome') {
          this.#mainViewElm.appendChild(this.#welcomeViewElm);
          window.location.hash = view;
        } 
        else if (view === 'accountSetup') {
            const accountSetupView = new AccountSetup(this.#server);
            accountSetupView.render().then(accountSetupElm => {
                this.#mainViewElm.appendChild(accountSetupElm);
                window.location.hash = view;
            });
        }
        else if (view === 'about') {
            const aboutView = new AboutView();
            aboutView.render().then(aboutViewElm => {
                this.#mainViewElm.appendChild(aboutViewElm);
                window.location.hash = view;
            });
        }
        else if (view === 'science') {
            const theScienceView = new TheScienceView();
            theScienceView.render().then(theScienceViewElm => {
                this.#mainViewElm.appendChild(theScienceViewElm);
                window.location.hash = view;
            });
        }
        else if (view === 'mainPage' && account) {
            const mainPageView = new MainPage(this.#server, account);
            mainPageView.render().then(mainPageElm => {
                this.#mainViewElm.appendChild(mainPageElm);
                window.location.hash = view;
            });
        }
    }

}
