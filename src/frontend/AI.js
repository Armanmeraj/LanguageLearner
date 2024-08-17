import { Account } from './Account.js';

export class Conversation {

  constructor(knownWords, unkownWords, language) {
    this.knownWords = knownWords;
    this.unknownWords = unkownWords;
    this.language = 'Spanish'; // You can adjust this or pass it in via constructor
  }

    // Function to start a conversation
    async startConversation() {
        try {
          const response = await fetch('http://localhost:3000/start-conversation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              language: this.language,
              knownWords: this.familiarWords,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to start conversation');
          }
    
          const data = await response.json();
          console.log('AI:', data.message);
          return data.message;
        } catch (error) {
          console.error('Error starting conversation:', error);
          throw error;
        }
    }

    // Function to handle user input and generate AI response

    async userSays(userInput) {
        try {
          const response = await fetch('http://localhost:3000/continue-conversation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              language: this.language,
              knownWords: this.familiarWords,
              userMessage: userInput,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to continue conversation');
          }
    
          const data = await response.json();
          console.log('AI:', data.reply);
          return data.reply;
        } catch (error) {
          console.error('Error during conversation:', error);
          throw error;
        }
      }
}

// const familiarWords = ['hola', 'adiós', 'gracias', 'por favor'];
//   const conversation = new Conversation(familiarWords);

//   // Start the conversation
//   await conversation.startConversation();

//   // User says something
//   await conversation.userSays('Estoy bien, gracias. ¿Cómo estás tú?');