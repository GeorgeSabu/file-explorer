import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import * as os from 'os';
let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 , webPreferences: {
    nodeIntegration: true,
    devTools: false
  }});
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/file-explorer/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

ipcMain.on('fs.readdirSync', (event, arg) => {
  const files = [];
  fs.readdirSync(arg.directory).forEach((file) => {
    if ((/(^|\/)\.[^\/\.]/g).test(file)) {
      return;
    }
    const stats = fs.statSync(path.resolve(arg.directory, file));
    files.push({ name: file, isDirectory: stats.isDirectory(), isFile: stats.isFile() });
  });
  win.webContents.send('fs.readdirSyncResponse', { data: files, address: arg.address });
});

ipcMain.on('fs.stat', (event, arg) => {
  fs.stat(arg.targetPath, (error, stats) => {
    stats['isItFile'] = stats.isFile();
    stats['isItDirectory'] = stats.isDirectory();
    win.webContents.send('fs.statResponse', { data: {error, stats}, address: arg.address });
  });
});

ipcMain.on('path.resolve', (event, arg) => {
  const result = path.resolve(...arg.functionargs);
  win.webContents.send('path.resolveResponse', { data: result, address: arg.address });
});

ipcMain.on('os.homedir', (event, arg) => {
  const result = os.homedir();
  win.webContents.send('os.homedirResponse', { data: result, address: arg.address });
});
