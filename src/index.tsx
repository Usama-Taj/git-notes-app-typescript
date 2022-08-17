import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GistProvider } from "context/gists";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GistProvider>
    <App />
  </GistProvider>
);
