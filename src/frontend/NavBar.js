import { Account } from './Account.js';
import { Server } from './Server.js';

export class NavBar {
    #navBarView = document.getElementById('navbar');

    #server = null;
    #account = null;

    constructor(server) {
        this.#server = server;
    }

    async renderPreLogin() {

        this.#navBarView.innerHTML = '';

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
            window.appInstance.navigateTo('welcome');
        });
        aboutView.addEventListener('click', () => {
            window.appInstance.navigateTo('about');
        })
        theScienceView.addEventListener('click', () => {
            window.appInstance.navigateTo('science');
        })

        this.#navBarView.appendChild(preLoginStyle);

        return this.#navBarView;
    }

    async renderPostLogin(account) {

        this.#account = account;

        this.#navBarView.innerHTML = '';

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

        const name = document.createElement('button');
        name.innerHTML = `<p>${this.#account.firstName} ${this.#account.lastName}</p>`;
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

        // getStartedView.addEventListener('click', () => {
        //     window.appInstance.navigateTo('welcome');
        // });
        // aboutView.addEventListener('click', () => {
        //     window.appInstance.navigateTo('about');
        // })
        // theScienceView.addEventListener('click', () => {
        //     window.appInstance.navigateTo('science');
        // })

        this.#navBarView.appendChild(postLoginStyle);

        return this.#navBarView;

    }

    async switch(view, account) {

        if (view == 'post') {
            await window.navbarInstance.renderPostLogin(account);
        }
        else {
            await this.renderPreLogin();
        }
    }
}