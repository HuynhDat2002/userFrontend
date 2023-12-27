import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import PaymentStatus from './components/PaymentStatus'
import { loadStripe } from "@stripe/stripe-js";

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