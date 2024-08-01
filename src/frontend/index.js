import { App } from './App.js';
import { NavBar } from './NavBar.js';
import { Server } from './Server.js';

// Mount the application to the root element.
const server = new Server();

const app = new App(server);
await app.render('root');

const navbar = new NavBar(server);
await navbar.renderPreLogin();


window.appInstance = app;
window.navbarInstance = navbar;