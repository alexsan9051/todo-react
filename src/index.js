import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import AppFunct from "./AppFunct";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <App/> */}
        <AppFunct />
    </React.StrictMode>
)