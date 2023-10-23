import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from 'axios';
import store  from "./store/store";
import { Provider } from "react-redux";

axios.defaults.baseURL =  "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
