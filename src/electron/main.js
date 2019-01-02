// https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c

const electron = require('electron');
const path = require('path');
const url = require('url');
const { formatTime } = require('../common/timeUtils');
const { intervals } = require('../common/constants');

const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Notification,
  Tray
} = electron;

let currentInterval = 0;
let interval, paused, tray;
let timeRemaining = intervals[currentInterval].length;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 170,
    height: 218,
    resizable: false
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  // Load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};

function getNextIntervalIndex() {
  return (currentInterval + 1) % intervals.length;
}

function showCompletionNotification() {
  return new Notification({
    title: `${intervals[currentInterval].title} complete! Starting ` +
      `${intervals[getNextIntervalIndex()].title.toLowerCase()} segment.`
  }).show();
}

function createInterval() {
  return setInterval(() => {
    if (paused) return;
    if (timeRemaining === 0) {
      showCompletionNotification();
    }
    if (timeRemaining < 0) {
      advanceToNextInterval();
    }
    sendTime();
    tray.setToolTip(formatTime(timeRemaining));
    timeRemaining -= 1;
  }, 1000);
}

function buildTray() {
  const tray = new Tray('src/assets/hourglass.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click() { app.quit(); }
    }
  ]);
  tray.setContextMenu(contextMenu);
  return tray;
};

function sendTime() {
  if (mainWindow) {
    mainWindow.webContents.send('time', {
      timeRemaining,
      intervalLength: intervals[currentInterval].length
    });
  }
};

function sendPaused() {
  if (mainWindow) {
    mainWindow.webContents.send('play-pause', {
      timerPaused: paused
    });
  }
};

function advanceToNextInterval() {
  currentInterval = getNextIntervalIndex();
  timeRemaining = intervals[currentInterval].length;
};

app.on('ready', () => {
  createWindow();
  sendTime();
  interval = createInterval();
  tray = buildTray();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('reset', () => {
  timeRemaining = intervals[currentInterval].length;
  sendTime();
  paused = true;
  sendPaused();
});

ipcMain.on('play-pause', () => {
  paused = !paused;
  sendPaused();
});

ipcMain.on('next', () => {
  advanceToNextInterval();
  sendTime();
});

app.on('will-quit', function () {
  clearInterval(interval);
});