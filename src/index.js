import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer } from 'react-toastify';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);


root.render(
    <Provider store={store}>
        <ToastContainer
            position="top-right"
            autoClose={300}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

        <App />
        <ToastContainer />
    </Provider>
);