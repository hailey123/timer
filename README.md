[![Build Status](https://travis-ci.com/hailey123/timer.svg?branch=master)](https://travis-ci.com/hailey123/timer)


[![Coverage Status](https://coveralls.io/repos/github/hailey123/timer/badge.svg?branch=master)](https://coveralls.io/github/hailey123/timer?branch=master) <- Goal is to improve this ASAP!

# Timer
This cross-platform desktop timer consists of two repeating segments: a work segment and a break segment. It sits on your desktop and in the task bar so you can easily view the current countdown time while working on your computer. It is built with [Electron](https://electronjs.org) and [React](https://reactjs.org) ([create-react-app](https://github.com/facebook/create-react-app)).

## Development
1. Clone this repository
2. `npm install` in the root directory
3. In one terminal, start the dev server: `npm run start`
4. In another terminal, run the electron app: `npm run electron:dev`
5. To run tests: `npm test`. To see a coverage report: `npm run test:coverage`

To generate a production build of the React client, do `npm run build`. This can then be tested with electron via `npm run electron`.
