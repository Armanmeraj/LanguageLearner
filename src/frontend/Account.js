export class Account {
    constructor(id, firstName, lastName, username, password, languagePreference) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.password = password;
      this.languagePreference = languagePreference;
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
  