// import {Component} from 'react';
// class Login extends Component{}


import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
// import Login from './components/Login';

// 載入toastify套件
import {ToastContainer} from 'react-toastify';

// 使用toast
// import {toast} from 'react-toastify';

// 載入toastify css
import 'react-toastify/dist/ReactToastify.css';

// 存儲jwToken使用localStorage.setItem(key,value)
import './commons/auth.js';

import "./css/app.scss";
import "./css/style.scss";
// import './index.css';

ReactDOM.render(
    <div>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        <Router/>
    </div>,
document.getElementById('root'))




// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


//https://github.com/lirenmi/react-store-start