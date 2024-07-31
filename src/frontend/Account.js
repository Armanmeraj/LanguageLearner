export class Account {
    constructor(firstName, lastName, username, password, languagePreference, wordBank = []) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.password = password;
      this.languagePreference = languagePreference;
      this.wordBank = wordBank;
    }
  
    // Method to add a word to the word bank
    addWord(word) {
      if (!this.wordBank.includes(word)) {
        this.wordBank.push(word);
      } else {
        console.log(`${word} is already in the word bank.`);
      }
    }
  
    // Method to remove a word from the word bank
    removeWord(word) {
      const index = this.wordBank.indexOf(word);
      if (index > -1) {
        this.wordBank.splice(index, 1);
      } else {
        console.log(`${word} is not in the word bank.`);
      }
    }
  
    // Method to change the language preference
    setLanguagePreference(newLanguage) {
      this.languagePreference = newLanguage;
    }
  
    // Method to display account information
    displayInfo() {
      console.log(`Name: ${this.firstName} ${this.lastName}`);
      console.log(`Username: ${this.username}`);
      console.log(`Language Preference: ${this.languagePreference}`);
      console.log(`Word Bank: ${this.wordBank.join(', ')}`);
    }
  
    // Method to verify password
    verifyPassword(password) {
      return this.password === password;
    }
  
    // Method to update password
    updatePassword(oldPassword, newPassword) {
      if (this.verifyPassword(oldPassword)) {
        this.password = newPassword;
        console.log('Password updated successfully.');
      } else {
        console.log('Old password is incorrect.');
      }
    }
  }
  
  // Example usage
//   const userAccount = new Account('John', 'Doe', 'johndoe', 'password123', 'English');
//   userAccount.addWord('hello');
//   userAccount.addWord('world');
//   userAccount.displayInfo();
  
//   userAccount.setLanguagePreference('Spanish');
//   userAccount.displayInfo();
  
//   userAccount.updatePassword('password123', 'newpassword456');
//   userAccount.displayInfo();
  