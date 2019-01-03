const electron = require('electron');
// const path = require('path');
// const url = require('url');
const { formatTime } = require('../common/timeUtils');
const { Intervals } = require('../common/constants');

const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Notification,
  Tray
} = electron;

let currentIntervalIndex = 0;
let interval, tray;
let timeRemaining = Intervals[currentIntervalIndex].time;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 170,
    height: 218,
    resizable: false
  });

  // TODO: what is this?
  // const startUrl = process.env.ELECTRON_START_URL || url.format({
  //   pathname: path.join(__dirname, '/../../build/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // });

  // Load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};

function getNextIntervalIndex() {
  return (currentIntervalIndex + 1) % Intervals.length;
}

function showCompletionNotification() {
  return new Notification({
    title: `${Intervals[currentIntervalIndex].title} complete! Starting ` +
      `${Intervals[getNextIntervalIndex()].title.toLowerCase()} segment.`
  }).show();
}

function updateTime() {
  sendTime();
  tray.setToolTip(formatTime(timeRemaining));
}

function startInterval() {
  return setInterval(() => {
    if (timeRemaining <= 0) {
      advanceToNextInterval();
      return;
    }
    timeRemaining -= 1;
    if (timeRemaining <= 0) {
      showCompletionNotification();
    }
    updateTime();
  }, 1000);
}

function buildTray() {
  const tray = new Tray('src/assets/hourglass.png');
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Quit',
    click() {
      app.quit();
    }
  }]);
  tray.setContextMenu(contextMenu);
  return tray;
};

function sendTime() {
  if (mainWindow) {
    mainWindow.webContents.send('time', {
      timeRemaining,
      intervalLength: Intervals[currentIntervalIndex].time
    });
  }
};

function sendIsPaused() {
  if (mainWindow) {
    mainWindow.webContents.send('play-pause', {
      timerPaused: isPaused()
    });
  }
};

function advanceToNextInterval() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  currentIntervalIndex = getNextIntervalIndex();
  timeRemaining = Intervals[currentIntervalIndex].time;
  updateTime();

  if (!interval) {
    interval = startInterval();
  }
};

function play() {
  interval = startInterval();

  // Never let timeRemaining go below 0, which could otherwise happen if
  // the user spams the play/pause button
  timeRemaining = Math.max(timeRemaining - 1, 0);

  updateTime();
}

function pause() {
  clearInterval(interval);
  interval = null;
}

function isPaused() {
  return !interval;
}

app.on('ready', () => {
  createWindow();
  tray = buildTray();
  updateTime();
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
  timeRemaining = Intervals[currentIntervalIndex].time;
  sendTime();

  pause();
  sendIsPaused();
});

ipcMain.on('play-pause', () => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
  sendIsPaused();
});

ipcMain.on('next', () => {
  advanceToNextInterval();
  sendTime();
});

app.on('will-quit', function () {
  clearInterval(interval);
  interval = null;
});