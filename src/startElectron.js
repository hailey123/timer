// https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c

const electron = require('electron')
const path = require('path')
const url = require('url')
const constants = require('./constants')

const { app, BrowserWindow, ipcMain, Tray } = electron

const intervals = [
  constants.DEFAULT_WORK_TIME,
  constants.DEFAULT_BREAK_TIME
]
let currentInterval = 0
let interval, paused, tray
let timeRemaining = intervals[currentInterval]

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 170,
    height: 218,
    resizable: false
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  })
  // Load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000')

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
      mainWindow = null
  })
}

const createInterval = () =>
  setInterval(() => {
    if (paused) return
    if (timeRemaining < 0) {
      nextInterval()
    }
    sendTime()
    timeRemaining--
  }, 1000)

const sendTime = () => {
  mainWindow.webContents.send('time', {
    timeRemaining,
    intervalLength: intervals[currentInterval]
  })
}

const sendPaused = () => {
  mainWindow.webContents.send('play-pause', {
    timerPaused: paused
  })
}

const nextInterval = () => {
  currentInterval = (currentInterval + 1) % 2
  timeRemaining = intervals[currentInterval]
}

app.on('ready', () => {
  createWindow()
  sendTime()
  interval = createInterval()
  tray = new Tray('src/assets/hourglass.png')
})

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

ipcMain.on('reset', () => {
  timeRemaining = intervals[currentInterval]
  sendTime()
  paused = true
  sendPaused()
})

ipcMain.on('play-pause', () => {
  paused = !paused
  sendPaused()
})

ipcMain.on('next', () => {
  nextInterval()
  sendTime()
})