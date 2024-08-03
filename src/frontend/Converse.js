
export class Converse {

    #converseView = null;
    #messageContainer = null;
    #inputField = null;
    #sendButton = null;

    async render() {
        this.#converseView = document.createElement('div');
        this.#converseView.classList.add('chat-container');

        this.#messageContainer = document.createElement('div');
        this.#messageContainer.classList.add('message-container');
        this.#converseView.appendChild(this.#messageContainer);

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');

        this.#inputField = document.createElement('input');
        this.#inputField.type = 'text';
        this.#inputField.placeholder = 'Type your message here...';
        inputContainer.appendChild(this.#inputField);

        this.#sendButton = document.createElement('button');
        this.#sendButton.innerText = 'Send';
        this.#sendButton.addEventListener('click', () => this.sendMessage());
        inputContainer.appendChild(this.#sendButton);

        this.#converseView.appendChild(inputContainer);
        document.body.appendChild(this.#converseView);
    }

    async sendMessage() {
        const message = this.#inputField.value;
        if (message.trim() === '') return;

        this.addMessage(message, 'user');
        this.#inputField.value = '';

        // Simulate receiving a response
        setTimeout(() => {
            this.addMessage('This is a simulated response.', 'bot');
        }, 1000);
    }

    addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerText = message;
        this.#messageContainer.appendChild(messageElement);

        this.#messageContainer.scrollTop = this.#messageContainer.scrollHeight;
    }
}
