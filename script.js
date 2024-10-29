// Code pour le tirage au sort (en commentaire car doit d'abord coder le HTML/CSS)

/* const names = [];

function addName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        const li = document.createElement('li');
        li.textContent = name;
        document.getElementById('names').appendChild(li);
        nameInput.value = '';
    }
}

function reset() {
    names.length = 0;
    document.getElementById('names').innerHTML = '';
}

function randomize() {
    if (names.length > 0) {
        const randomIndex = Math.floor(Math.random() * names.length);
        alert(`Nom sélectionné : ${names[randomIndex]}`);
    } else {
        alert('Veuillez ajouter au moins un prénom.');
    }
}
*/

// Code générique pour Electron.js
const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});