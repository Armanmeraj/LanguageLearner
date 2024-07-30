export class WelcomePage {

    async render() {

        const welcomeViewElm = document.createElement('div');
        welcomeViewElm.id = 'welcome-page-view';

        const welcomeText = document.createElement('div')
        welcomeText.id = 'welcomeText'
        welcomeText.innerText = "Welcome to the App"

        const startButtonArea = document.createElement('div')
        startButtonArea.id = 'startBtnArea'
        const loginButton = new ButtonHandler('startBtnArea')


        welcomeViewElm.appendChild(welcomeText);
        return welcomeViewElm;
    }
}

export class ButtonHandler {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.initialize();
    }

    async initialize() {
        this.renderGetStartedButton();
    }

    async renderGetStartedButton() {
        this.clearContainer();
        const getStartedButton = document.createElement('button');
        getStartedButton.textContent = 'Get Started';
        getStartedButton.onclick = () => this.handleGetStartedClick();
        this.container.appendChild(getStartedButton);
    }

    async handleGetStartedClick() {
        this.clearContainer();
        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.onclick = () => this.renderLogin(); 

        const createAccountButton = document.createElement('button');
        createAccountButton.textContent = 'Create New Account';
        createAccountButton.onclick = () => this.renderCreateAccount();

        this.container.appendChild(loginButton);
        this.container.appendChild(createAccountButton);
    }

    async renderLogin() {
        this.clearContainer();
        const usernameInput = document.createElement('input');
        usernameInput.placeholder = 'Username';

        const passwordInput = document.createElement('input');
        passwordInput.placeholder = 'Password';
        passwordInput.type = 'password';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.onclick = () => this.handleLogin(usernameInput.value, passwordInput.value);

        this.container.appendChild(usernameInput);
        this.container.appendChild(passwordInput);
        this.container.appendChild(submitButton);
    }

    async renderCreateAccount() {
        this.clearContainer();
        const usernameInput = document.createElement('input');
        usernameInput.placeholder = 'Username';

        const passwordInput = document.createElement('input');
        passwordInput.placeholder = 'Password';
        passwordInput.type = 'password';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.onclick = () => this.handleCreateAccount(usernameInput.value, passwordInput.value);

        this.container.appendChild(usernameInput);
        this.container.appendChild(passwordInput);
        this.container.appendChild(submitButton);
    }

    async handleLogin(username, password) {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword === password) {
            alert('Login successful!');
            this.clearContainer();
        } else {
            alert('Invalid username or password.');
        }
    }

    async handleCreateAccount(username, password) {
        if (localStorage.getItem(username)) {
            alert('Username already exists.');
        } else {
            localStorage.setItem(username, password);
            alert('Account created successfully!');
            this.clearContainer();
        }
    }

    clearContainer() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}

// Usage
// document.addEventListener('DOMContentLoaded', () => {
//     new ButtonHandler('button-container');
// });
