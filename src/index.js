import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style/sp-style.css";
import * as serviceWorker from "./tools/serviceWorkerr";
import { BrowserRouter } from "react-router-dom";

const target = document.getElementById("root");

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  target
);
serviceWorker.unregister();
