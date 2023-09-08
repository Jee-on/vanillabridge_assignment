import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./chat.css";
import Chat from "./chat";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>
);
