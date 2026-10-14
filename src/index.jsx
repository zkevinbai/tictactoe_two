import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// import App from "./ticTacToe/App/App";
import Game from './ticTacToe';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    {/* <App /> */}
    <Game />
  </StrictMode>
);