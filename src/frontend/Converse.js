
export class Converse {
    
    #server = null;
    #app = null;

    constructor(server, app) {
        this.#server = server;
        this.#app = app;
    } // Make the buttons all come into this class instead of their own individual classes.

    async render() {
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

    // Append chat container to the body
    document.body.appendChild(chatContainer);

    // Add CSS styles using JavaScript
    const styles = `
       body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
             margin: 0;
        // Remove the closing curly brace

       #chat-container {
            width: 350px;
            height: 500px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

    #chat-window {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    #chat-messages {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    #chat-input-container {
        display: flex;
        padding: 10px;
        border-top: 1px solid #ddd;
    }

    #user-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 10px;
    }

    #send-btn {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    #send-btn:hover {
        background-color: #0056b3;
    }

    .message {
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
        max-width: 80%;
    }

    .message.user {
        align-self: flex-end;
        background-color: #007bff;
        color: white;
    }

    .message.bot {
        align-self: flex-start;
        background-color: #f1f1f1;
        color: black;
    }`;

    // Create a style element and append to the head
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Add event listener to send button
    sendBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
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

    }
}