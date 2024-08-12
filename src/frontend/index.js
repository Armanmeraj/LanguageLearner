import { App } from './App.js';
import { Server } from './Server.js';

window.addEventListener('load', async(event) => {

    const server = new Server();
    await server.restore();

    const app = new App(server);
    await app.render('root');

    const destroyButton = document.getElementById('destroy');
    document.body.appendChild(destroyButton);
    destroyButton.addEventListener('click', async() => {
        server.destroy();
        window.location.reload();
    });
    
});