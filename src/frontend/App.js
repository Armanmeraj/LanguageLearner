import { WelcomePage } from './Welcome.js';
import { Server } from './Server.js';
import { Home } from './Home.js';

export class App {

    #server = null;
    #navBarElm = null;
    #bodyElm = null;

    constructor(server) {
        this.#server = server;
    }

    async render(root) {

        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        this.#navBarElm = document.createElement('div');
        this.#navBarElm.id = 'navBarElm';
        this.#bodyElm = document.createElement('div');
        this.#bodyElm.id = 'bodyElm';

        rootElm.appendChild(this.#navBarElm);
        rootElm.appendChild(this.#bodyElm);

        let view = await this.#server.findView();
        await this.navigateTo(view);

    }

    async navigateTo(view) {
        this.#bodyElm.innerHTML = '';
        this.#navBarElm.innerHTML = '';

        if (view === 'welcome') {
            const welcomeView = new WelcomePage(this.#server, this);
            this.#bodyElm.appendChild(await welcomeView.render());
            window.location.hash = view;
            await this.#server.updateView(view);
            await this.adjustNavBar();
        } 
        else if (view === 'about') {
            const aboutView = new AboutView();
            this.#bodyElm.appendChild(await aboutView.render());
            window.location.hash = view;
            await this.#server.updateView(view);
            await this.adjustNavBar();
        }
        else if (view === 'science') {
            const theScienceView = new TheScienceView();
            this.#bodyElm.appendChild(await theScienceView.render());
            window.location.hash = view;
            await this.#server.updateView(view);
            await this.adjustNavBar();
        }
        else if (view === 'home') {
            const homeView = new Home(this.#server);
            this.#bodyElm.appendChild(await homeView.render());
            window.location.hash = view;
            await this.#server.updateView(view);
            await this.adjustNavBar();
        }
    }
    async renderPreLoginNavBar() { // Fix CSS

        this.#navBarElm.innerHTML = '';

        const preLoginStyle = document.createElement('div');
        preLoginStyle.id = 'preLoginStyle'

        const getStartedView = document.createElement('button');
        getStartedView.innerHTML = "Get Started";
        getStartedView.className = 'navbarButton';

        const aboutView = document.createElement('button');
        aboutView.innerHTML = "About";
        aboutView.className = 'navbarButton';

        const theScienceView = document.createElement('button');
        theScienceView.innerHTML = "The Science";
        theScienceView.className = 'navbarButton';

        preLoginStyle.appendChild(getStartedView);
        preLoginStyle.appendChild(aboutView);
        preLoginStyle.appendChild(theScienceView);

        getStartedView.addEventListener('click', () => {
            this.navigateTo('welcome')
        });
        aboutView.addEventListener('click', () => {
            this.navigateTo('about');
        })
        theScienceView.addEventListener('click', () => {
            this.navigateTo('science');
        })

        this.#navBarElm.appendChild(preLoginStyle);
    }
    async renderPostLoginNavBar() {

        this.#navBarElm.innerHTML = '';

        const postLoginStyle = document.createElement('div');
        postLoginStyle.id = 'postLoginStyle'

        const leftPostLoginStyle = document.createElement('div');
        leftPostLoginStyle.id = 'leftPostLoginStyle'

        const rightPostLoginStyle = document.createElement('div');
        rightPostLoginStyle.id = 'rightPostLoginStyle'

        const converseView = document.createElement('button');
        converseView.innerHTML = "Converse";
        converseView.className = 'navbarButton2';

        const reviseView = document.createElement('button');
        reviseView.innerHTML = "Revise";
        reviseView.className = 'navbarButton2';

        const memorizeView = document.createElement('button');
        memorizeView.innerHTML = "Memorize";
        memorizeView.className = 'navbarButton2';

        const line = document.createElement('div');
        line.id = 'navbarLine';

        const aboutView = document.createElement('button');
        aboutView.innerHTML = "About";
        aboutView.className = 'navbarButton2';

        const theScienceView = document.createElement('button');
        theScienceView.innerHTML = "The Science";
        theScienceView.className = 'navbarButton2';

        const account = await this.#server.findAccount();
        const name = document.createElement('button');
        name.innerHTML = `<p>${account.firstName} ${account.lastName}</p>`;
        name.id = 'navbarName';

        leftPostLoginStyle.appendChild(converseView);
        leftPostLoginStyle.appendChild(reviseView);
        leftPostLoginStyle.appendChild(memorizeView);

        rightPostLoginStyle.appendChild(aboutView);
        rightPostLoginStyle.appendChild(theScienceView);

        postLoginStyle.appendChild(leftPostLoginStyle);
        postLoginStyle.appendChild(line);
        postLoginStyle.appendChild(rightPostLoginStyle);

        postLoginStyle.appendChild(name);

        aboutView.addEventListener('click', () => {
            this.navigateTo('about');
        })
        theScienceView.addEventListener('click', () => {
            this.navigateTo('science');
        })

        this.#navBarElm.appendChild(postLoginStyle);

    }

    async adjustNavBar() {

        let loggedIn = await this.#server.findLoginStatus();
        if (loggedIn == 'true') {
            await this.renderPostLoginNavBar();
        }
        else if (loggedIn == 'false') {
            await this.renderPreLoginNavBar();
        }
        else {
            console.log('Error: Login status not found');
        }
    }

}

class TheScienceView {

    #theScienceView = null;

    async render() {
        this.#theScienceView = document.createElement('div');
        this.#theScienceView.innerHTML = `<h1 style="color:black;>Later, an essay about what the science is behind the app will go here</h1>`;

        return this.#theScienceView;
    }
}

class AboutView {

    #aboutView = null;

    async render() {
        this.#aboutView = document.createElement('div');
        this.#aboutView.innerHTML = `<h1>Later, an essay about what the website is about and features will go here</h1>`;

        return this.#aboutView;
    }
}
