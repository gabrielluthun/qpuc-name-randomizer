// Constante pour créer une fenêtre de navigateur
const { app, BrowserWindow } = require('electron/main')
// Constante pour gérer les chemins de fichiers
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // Script de préchargement de la fenêtre
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}
//Quand l'app est prête, on appelle la fonction createWindow
app.whenReady().then(() => {
  createWindow()

  // Si l'application est active sans fenêtre, on en crée une nouvelle
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
// Détecteur d'événement pour fermer l'application
app.on('window-all-closed', () => {
    // Darwin est le noyau de MacOS, donc si on est pas sur MacOS, on ferme l'application
  if (process.platform !== 'darwin') {
    app.quit()
  }
})