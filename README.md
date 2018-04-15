# Timer
This cross-platform desktop timer consists of two repeating segments: a work segment and a break segment. It sits on your desktop and in the task bar so you can easily view the current countdown time while working on your computer. It is built with [Electron](https://electronjs.org) and [React](https://reactjs.org).

## Install
1. Clone this repository
1. `npm i` in the root directory

## Run

### Development mode
Development mode uses [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to serve static assets to the electron app and enable hot reloading of React components.
1. In one terminal, start the dev server: `npm run start`
1. In another terminal, run the electron app: `npm run electron:dev`

### Production mode
1. Generate a build in the **build/** directory: `npm run build`
1. Run the electron app: `npm run electron`