import { Conversation } from './AI.js';

export class Converse {
    
    #server = null;
    #account = null;

    constructor(server) {
        this.#server = server;
    } // Make the buttons all come into this class instead of their own individual classes.

    async render() {

        this.#account = await this.#server.findAccount();
        const wordBank = await this.#server.readWordBank(this.#account.id)
        const knownWords = wordBank.knownWords;
        const unknownWords = wordBank.unknownWords;

        const conversation = new Conversation(knownWords, unknownWords, this.#account.languagePreference);
        // Create chat container

        const chatContainer = document.createElement('div');
        chatContainer.id = 'chat-container';

        // Create chat window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'chat-window';

        // Create chat messages container
        const chatMessages = document.createElement('div');
        chatMessages.id = 'chat-messages';

        // Append chat messages to chat window
        chatWindow.appendChild(chatMessages);

        // Create chat input container
        const chatInputContainer = document.createElement('div');
        chatInputContainer.id = 'chat-input-container';

        // Create user input field
        const userInput = document.createElement('input');
        userInput.type = 'text';
        userInput.id = 'user-input';
        userInput.placeholder = 'Type a message...';

        // Create send button
        const sendBtn = document.createElement('button');
        sendBtn.id = 'send-btn';
        sendBtn.textContent = 'Send';

        // Append input field and button to input container
        chatInputContainer.appendChild(userInput);
        chatInputContainer.appendChild(sendBtn);

        // Append chat window and input container to chat container
        chatContainer.appendChild(chatWindow);
        chatContainer.appendChild(chatInputContainer);

        addMessage(await conversation.startConversation(), 'bot');

        // Add event listener to send button
        sendBtn.addEventListener('click', async function() {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                addMessage(await conversation.userSays(message), 'bot');
                userInput.value = '';


                // Here you would call your OpenAI API and handle the bot response
                // For example:
                // const botResponse = await getBotResponse(message);
               // addMessage(botResponse, 'bot');
            }
        });

        function addMessage(text, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
            messageElement.textContent = text;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        return chatContainer;
    }

}