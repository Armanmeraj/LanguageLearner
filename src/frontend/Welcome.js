import { App } from './App.js';
import { Home } from './Home.js';
import { Account } from './Account.js';

export class WelcomePage {

    #welcomeBackground = null;
    #welcomeContent = null;
    #server = null;
    #app = null;

    constructor(server, app) {
        this.#server = server;
        this.#app = app;
    } // Make the buttons all come into this class instead of their own individual classes.

    async render() { 

        this.#welcomeBackground = document.createElement('div');
        this.#welcomeBackground.id = 'welcomeBackground';

        // const imageLinks = [
        //     'https://www.pexels.com/photo/people-walking-on-the-street-2506923/',
        //     'https://example.com/image2.jpg',
        //     'https://example.com/image3.jpg',
        //     // Add more image URLs as needed
        // ];

        // let currentIndex = 0;

        // function changeBackground() {
        //     const welcomeBackground = document.getElementById('welcomeBackground');
        //     welcomeBackground.style.backgroundImage = `url(${imageLinks[currentIndex]})`;
        //     currentIndex = (currentIndex + 1) % imageLinks.length;
        // }

        // setInterval(changeBackground, 7000);

        // // Initialize the first background
        // changeBackground();

        this.#welcomeContent = document.createElement('div')
        this.#welcomeContent.id = 'welcomeContent'

        const welcomeText = document.createElement('div')
        welcomeText.id = 'welcomeText'
        welcomeText.innerText = "Welcome to Class"

        const createAccountButton = document.createElement('button')
        createAccountButton.id = 'createAccountButtonStyle'
        createAccountButton.innerHTML = "Create Account"

        const loginAccountButton = document.createElement('button')
        loginAccountButton.id = 'loginAccountButtonStyle'
        loginAccountButton.innerHTML = "Login"

        this.#welcomeContent.appendChild(welcomeText)
        this.#welcomeContent.appendChild(createAccountButton)
        this.#welcomeContent.appendChild(loginAccountButton)

        this.#welcomeBackground.appendChild(this.#welcomeContent)

        createAccountButton.addEventListener('click', () => {
            this.createAccount();
        });

        loginAccountButton.addEventListener('click', () => {    
            this.login();
        });


        return this.#welcomeBackground;
    }
    createAccount() {

        this.#welcomeContent.innerHTML = '';

        const accountSetupView = document.createElement('div');
        accountSetupView.id = 'accountSetupView';

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

        const languageSelectorView = document.createElement('div')
        languageSelectorView.id = 'languageSelectorView'
        let language = null;

        // Generate vertical scroll bar selector with buttons for Spanish, French, Italian

        const languages = ['Spanish', 'French', 'Italian', 'Hindi', 'Arabic', 'Mandarin', 'Japanese'];
        languages.forEach(lang => {
            const langOption = document.createElement('div');
            langOption.className = 'languageOption';
            langOption.innerText = lang;
            langOption.addEventListener('click', () => {
                language = lang;
                document.querySelectorAll('.languageOption').forEach(el => el.classList.remove('selected'));
                langOption.classList.add('selected');
            });
            languageSelectorView.appendChild(langOption);
        });

        languageSelectorView.style.overflowY = 'scroll';
        languageSelectorView.style.maxHeight = '100px'; // Adjust as needed

        const submitButton = document.createElement('button');
        submitButton.id = 'submitAccountButtonStyle'
        submitButton.innerHTML = "Submit"

        submitButton.addEventListener('click', async () => {
            
            try {
                // Validate account credentials
                // Save account to database and server
                // Traverse to main page

                // Create Account and save to MySQL server
                const newAccount = new Account(
                    null,
                    firstNameInput.value,
                    lastNameInput.value,
                    createUsernameInput.value,
                    createPasswordInput.value,
                    language
                );
                console.log("About to upload: " + JSON.stringify(newAccount));
                await this.#server.createAccount(newAccount);

                // Get account back from MySQL server
                const account = await this.#server.readAccount(newAccount.username);
                console.log("Successfully uploaded: " + JSON.stringify(account));
                // Save account to instance
                await this.#server.saveAccount(account);
                await this.#server.confirmLogin('true');
                await this.#app.navigateTo('home'); 

                // Figure out how to get to main page
            } catch (error) {
                console.error(error);
            }
            
        });

        accountSetupView.appendChild(firstNameInput);
        accountSetupView.appendChild(lastNameInput);
        accountSetupView.appendChild(createUsernameInput);
        accountSetupView.appendChild(createPasswordInput);
        accountSetupView.appendChild(selectLanguageText);
        accountSetupView.appendChild(languageSelectorView)
        accountSetupView.appendChild(submitButton);

        this.#welcomeBackground.appendChild(accountSetupView);

    }
    login() {

        this.#welcomeContent.innerHTML = '';

        const loginBigText = document.createElement('div')
        loginBigText.id = 'loginBigText'

        const loginInputView = document.createElement('div')
        loginInputView.id = 'loginInputView'
        loginInputView.innerHTML = '';

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

        goButton.addEventListener('click', async () => {
            const username = usernameInputView.value;
            const password = passwordInputView.value;

            try {
                const account = await this.#server.readAccount(username);
                console.log(account);
        
                if (account && account.username === username && account.password === password) {
                    // Navigate to Main Page
                    await this.#server.saveAccount(account);
                    await this.#server.confirmLogin('true');
                    await this.#app.navigateTo('home');
                } else {
                    alert('Invalid username or password');
                }
            } catch (error) {
                console.error(error);
                alert('Could not connect to server');
            }
        });

        loginInputView.appendChild(usernameInputView)
        loginInputView.appendChild(passwordInputView)

        this.#welcomeContent.appendChild(loginBigText)
        this.#welcomeContent.appendChild(loginInputView)
        this.#welcomeContent.appendChild(goButton)


    }
}
