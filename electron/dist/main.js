"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var fs = require("fs");
var url = require("url");
var os = require("os");
var win;
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600, webPreferences: {
            nodeIntegration: true,
            devTools: false
        } });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/file-explorer/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
electron_1.ipcMain.on('fs.readdirSync', function (event, arg) {
    var files = [];
    fs.readdirSync(arg.directory).forEach(function (file) {
        if ((/(^|\/)\.[^\/\.]/g).test(file)) {
            return;
        }
        var stats = fs.statSync(path.resolve(arg.directory, file));
        files.push({ name: file, isDirectory: stats.isDirectory(), isFile: stats.isFile() });
    });
    win.webContents.send('fs.readdirSyncResponse', { data: files, address: arg.address });
});
electron_1.ipcMain.on('fs.stat', function (event, arg) {
    fs.stat(arg.targetPath, function (error, stats) {
        stats['isItFile'] = stats.isFile();
        stats['isItDirectory'] = stats.isDirectory();
        win.webContents.send('fs.statResponse', { data: { error: error, stats: stats }, address: arg.address });
    });
});
electron_1.ipcMain.on('path.resolve', function (event, arg) {
    var result = path.resolve.apply(path, arg.functionargs);
    win.webContents.send('path.resolveResponse', { data: result, address: arg.address });
});
electron_1.ipcMain.on('os.homedir', function (event, arg) {
    var result = os.homedir();
    win.webContents.send('os.homedirResponse', { data: result, address: arg.address });
});
//# sourceMappingURL=main.js.map