import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./config/index.ts";
import { Provider as StoreProvider } from "react-redux";
import axios from "axios";

axios.defaults.headers.common["Content-type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
// cactch special 503 error
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 503) {
      console.log("503 error");
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
