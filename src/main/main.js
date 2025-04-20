const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const GameManager = require('./gameManager');

let mainWindow;

function createWindow () {
  const { workArea } = screen.getPrimaryDisplay();

  mainWindow = new BrowserWindow({
    x: workArea.x,
    y: workArea.y,
    width: workArea.width,
    height: workArea.height,
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());
}

app.whenReady().then(createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

/* IPC ----------------------------------------------------------------- */
const gm = new GameManager();

ipcMain.handle('plugins:list', ()      => gm.list());
ipcMain.handle('game:install', (_, id) => gm.install(id));
ipcMain.handle('game:update',  (_, id) => gm.update(id));
ipcMain.handle('game:launch',  (_, id) => gm.launch(id));
// --- controles da janela ----------------------------------------------------
ipcMain.on('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window:close', () => {
  if (mainWindow) mainWindow.close();
});

