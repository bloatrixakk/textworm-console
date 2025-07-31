const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const Store = require("electron-store").default;

const isDev = !app.isPackaged;

const log = require('electron-log');
autoUpdater.logger = log;
log.transports.file.level = 'debug';

const store = new Store();
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

function getAssetPath(...paths) {
  return isDev
    ? path.join(__dirname, ...paths)
    : path.join(process.resourcesPath, ...paths);
}

function getPreloadPath(file) {
  return path.join(__dirname, file); // preload lives in app.asar
}


function createWindow(htmlPath, preloadPath, width = 1000, height = 800) {
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    show: false,
  });

  win.loadFile(htmlPath);

  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow(
    getAssetPath("build", "index.html"),
    getPreloadPath("preload.js")
  );
  autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

autoUpdater.on("update-available", (info) => {
  const updateWindow = createWindow(
    getAssetPath("build", "update", "update.html"),
    getPreloadPath("updatePreload.js"),
    400,
    400
  );

  function showMessage(message) {
    console.log(message);
    updateWindow.webContents.send(message);
  }

  showMessage(
    `Update Available! \n v${info.version} will be installed when you close the application.`
  );
});

autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available:', info);
});

autoUpdater.on('error', (err) => {
  log.error('Error in auto-updater:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  log.info(`Download speed: ${progressObj.bytesPerSecond}`);
  log.info(`Downloaded ${progressObj.percent}%`);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...');
});

// --------- IPC HANDLERS ---------
ipcMain.handle("save-token", (event, token) => {
  store.set("authToken", token);
});

ipcMain.handle("get-token", () => {
  return store.get("authToken") || null;
});

ipcMain.handle("delete-token", () => {
  store.delete("authToken");
});
