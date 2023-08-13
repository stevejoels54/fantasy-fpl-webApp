import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./config/index.ts";
import { Provider as StoreProvider } from "react-redux";
import axios from "axios";

axios.defaults.headers.common["Content-type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
