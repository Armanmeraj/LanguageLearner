import { Account } from './Account.js';
import { Server } from './Server.js';
import { NavBar } from './NavBar.js';

export class AccountSetup {

    #accountSetupViewElm = null;
    #newAccount = null;
    #server = null;

    constructor(server) {
        this.#server = server;
    }

    async render() { 


        this.#accountSetupViewElm = document.createElement('div');
        this.#accountSetupViewElm.id = 'accountSetupView';

        const firstNameInput = document.createElement('input')
        firstNameInput.setAttribute('type', 'text')
        firstNameInput.setAttribute('placeholder', 'First Name')
        firstNameInput.className = "AccountInput"

        const lastNameInput = document.createElement('input')
        lastNameInput.setAttribute('type', 'text')
        lastNameInput.setAttribute('placeholder', 'Last Name')
        lastNameInput.className = "AccountInput"

        const createUsernameInput = document.createElement('input')
        createUsernameInput.setAttribute('type', 'text')
        createUsernameInput.setAttribute('placeholder', 'Username')
        createUsernameInput.className = "AccountInput"

        const createPasswordInput = document.createElement('input')
        createPasswordInput.setAttribute('type', 'text')
        createPasswordInput.setAttribute('placeholder', 'Password')
        createPasswordInput.className = "AccountInput"

        const selectLanguageText = document.createElement('div')
        selectLanguageText.id = 'selectLanguageText'
        selectLanguageText.innerText = "Select Your Language:"

        const languageSelector = new LanguageSelector();

        const submitButton = document.createElement('button');
        submitButton.id = 'submitAccountButtonStyle'
        submitButton.innerHTML = "Submit"

        submitButton.addEventListener('click', () => {
            
            if (firstNameInput.value && lastNameInput.value && createUsernameInput.value && createPasswordInput.value) {
                this.#newAccount = new Account(firstNameInput.value, 
                    lastNameInput.value, createUsernameInput.value, 
                    createPasswordInput.value, languageSelector.language);

                this.#server.saveAccount(this.#newAccount);
                window.appInstance.navigateTo('mainPage', this.#newAccount);
                window.navbarInstance.switch('post', this.#newAccount);
            }
            
        })

        this.#accountSetupViewElm.appendChild(firstNameInput);
        this.#accountSetupViewElm.appendChild(lastNameInput);
        this.#accountSetupViewElm.appendChild(createUsernameInput);
        this.#accountSetupViewElm.appendChild(createPasswordInput);
        this.#accountSetupViewElm.appendChild(selectLanguageText);
        this.#accountSetupViewElm.appendChild(await languageSelector.render())
        this.#accountSetupViewElm.appendChild(submitButton);

        return this.#accountSetupViewElm;
    }

    get account() {
        return this.#newAccount;
    }
}

export class LanguageSelector {

    #languageSelectorView = null;
    #language = null;

    async render() {

        this.#languageSelectorView = document.createElement('div')
        this.#languageSelectorView.id = 'languageSelectorView'

        // Generate vertical scroll bar selector with buttons for Spanish, French, Italian

        const languages = ['Spanish', 'French', 'Italian', 'Hindi', 'Arabic', 'Mandarin', 'Japanese'];
        languages.forEach(lang => {
            const langOption = document.createElement('div');
            langOption.className = 'languageOption';
            langOption.innerText = lang;
            langOption.addEventListener('click', () => {
                this.#language = lang;
                document.querySelectorAll('.languageOption').forEach(el => el.classList.remove('selected'));
                langOption.classList.add('selected');
            });
            this.#languageSelectorView.appendChild(langOption);
        });

        this.#languageSelectorView.style.overflowY = 'scroll';
        this.#languageSelectorView.style.maxHeight = '100px'; // Adjust as needed

        return this.#languageSelectorView;
    }

    get language() {
        return this.#language;
    }

}