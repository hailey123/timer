// https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c

const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow, Tray } = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 170,
    height: 220,
    // resizable: false,
    alwaysOnTop: true
  });

  // Load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
      mainWindow = null
  })
}

let tray;
app.on('ready', () => {
  createWindow()
  tray = new Tray('src/assets/hourglass.png')
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})