import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskMenu from './components/TaskMenu/TaskMenu';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <TaskMenu/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
