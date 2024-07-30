import { Events } from './Events.js';
import { WelcomePage } from './login.js';

export class App {

    #mainViewElm = null;

    async render(root) {


        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        this.#mainViewElm = document.createElement('div');
        this.#mainViewElm.id = 'main-view';

        rootElm.appendChild(this.#mainViewElm);
    }

    #navigateTo(view) {
        this.#mainViewElm.innerHTML = '';
        if (view === 'todolist') {
          this.#mainViewElm.appendChild(this.#todolistViewElm);
          window.location.hash = view;
        } else if (view === 'archive') {
          // TODO: this is where we want to add the archive view
          const archive = document.createElement('div');
          archive.innerHTML = '<h1>Archive Completed </h1>';
          
          if (this.#deleted.length !== 0) {
            const taskList = document.createElement('ul');
            this.#deleted.forEach(task => {
              const taskItem = document.createElement('li');
              taskItem.textContent = task.name;
              taskList.appendChild(taskItem);
            });
            archive.appendChild(taskList);
          } else {
            archive.innerHTML += '<p>No tasks have been completed yet.</p>';
          }
    
          this.#mainViewElm.appendChild(archive);
          window.location.hash = view;
        } else {
          this.#mainViewElm.appendChild(this.todolist);
          window.location.hash = 'todolist';
        }
      }
}
