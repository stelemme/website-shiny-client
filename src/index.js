import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "rsuite/dist/rsuite.min.css";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
