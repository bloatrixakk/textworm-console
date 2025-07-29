const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store').default;

const store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // preload must be outside src
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // win.loadURL('http://localhost:3000');
  win.loadFile(path.join(__dirname, 'build', 'index.html'));

  // win.webContents.openDevTools(); // REMOVE THIS IN PRODUCTION
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// --------- IPC HANDLERS ---------
ipcMain.handle('save-token', (event, token) => {
  store.set('authToken', token);
});

ipcMain.handle('get-token', () => {
  return store.get('authToken') || null;
});

ipcMain.handle('delete-token', () => {
  store.delete('authToken');
});
