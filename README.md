# React Tic Tac Toe

## This is a tic tac toe game with time travel implemented

Fun things done
- [x] For the current move only, show “You are at move #…” instead of a button. 17 October 2023 Tuesday
- [x] Rewrite Board to use two loops to make the squares instead of hardcoding them. 17 October 2023 Tuesday
  * this was challenging for me
  * the key part is this line `const squareIndex = row * 3 + col;` the index at any point in a 3x3 square is equal to the row (0, 1, 2) multiplied by 3 plus the column (0, 1, 2) 17 October 2023 Tuesday
- [x] Add a toggle button that lets you sort the moves in either ascending or descending order.
  * much better to do this with css
  * ran into trouble with style not applying, issue was that I was not importing the stylesheet
- [x] When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw). 18 October 2023 Wednesday
- [x] Display the location for each move in the format (row, col) in the move history list. 18 October 2023 Wednesday
- [x] Refactor this nonsense, separation of concerns 25 October 2023 Wednesday
- [x] Add testing 25 October 2023 Wednesday
- [x] Style and make pretty 26 October 2023 Thursday
- [x] Add an AI to play against you 27 October 2023 Friday
  - [x] Toggle AI or two player mode
  - [x] AI should pick a random move
  - [x] AI should pick the best move
  - [ ] add a slider to control how fast the AI plays
- [ ] switch back and forth between X and O

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
