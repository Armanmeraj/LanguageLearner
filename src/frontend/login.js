import { App } from './App.js';
import { MainPage } from './MainPage.js';
import { NavBar } from './NavBar.js';

export class WelcomePage {

    #welcomeViewElm = null;
    #startButtonView = null;
    #server = null;

    constructor(server) {
        this.#server = server;
    }

    async render() {

        this.#welcomeViewElm = document.createElement('div');
        this.#welcomeViewElm.id = 'welcome-page-view';

        const welcomeText = document.createElement('div')
        welcomeText.id = 'welcomeText'
        welcomeText.innerText = "Welcome to Class"


        const startButton = new LoginButton(this.#server);
        this.#startButtonView = await startButton.render()


        this.#welcomeViewElm.appendChild(welcomeText);
        this.#welcomeViewElm.appendChild(this.#startButtonView);

        return this.#welcomeViewElm;
    }
}

export class LoginButton {

    #buttonView = null;
    #server = null;

    constructor(server) {
        this.#server = server;
    }

    async render() {
        this.#buttonView = document.createElement('div');
        this.#buttonView.id = 'loginButtonView'

        const createAccountButton = document.createElement('button')
        createAccountButton.id = 'createAccountButtonStyle'
        createAccountButton.innerHTML = "Create Account"

        const loginAccountButton = document.createElement('button')
        loginAccountButton.id = 'loginAccountButtonStyle'
        loginAccountButton.innerHTML = "Login"

        this.#buttonView.appendChild(createAccountButton);
        this.#buttonView.appendChild(loginAccountButton);

        loginAccountButton.addEventListener('click', () => this.loginView())

        createAccountButton.addEventListener('click', () => {

            window.appInstance.navigateTo('accountSetup')
        })



        return this.#buttonView;
    }

    async loginView() {

        this.#buttonView.innerHTML = '';

        const usernameInputView = document.createElement('input')
        usernameInputView.setAttribute('type', 'text')
        usernameInputView.setAttribute('placeholder', 'Username')
        usernameInputView.className = "loginInputs"

        const passwordInputView = document.createElement('input')
        passwordInputView.setAttribute('type', 'text')
        passwordInputView.setAttribute('placeholder', 'Password')
        passwordInputView.className = "loginInputs"


        const goButton = document.createElement('button')
        goButton.innerHTML = "Go"

        const formatWindow = document.createElement('div')
        formatWindow.id = 'loginFormatWindow'

        formatWindow.appendChild(usernameInputView)
        formatWindow.appendChild(passwordInputView)
        formatWindow.appendChild(goButton)

        this.#buttonView.appendChild(formatWindow)
        
        goButton.addEventListener('click', () => {
            const username = usernameInputView.value;
            const password = passwordInputView.value;
            const account = this.#server.getAccountByUsername(username);
            if (account && account.verifyPassword(password)) {
                // alert('Login successful!');
                window.appInstance.navigateTo('mainPage', account);
                window.navbarInstance.switch('post', account);
            } // else {
            //      alert('Invalid username or password.');
            // }
        })
    }
}
