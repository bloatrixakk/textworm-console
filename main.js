const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'), // optional
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:3000'); // dev
  // win.loadFile('build/index.html'); // production
}

app.whenReady().then(createWindow);
