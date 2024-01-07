import React from 'react'
import ReactDOM from 'react-dom/client'
import firebaseConfig from './firebase.config.js'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx'
import ForgetPass from './pages/ForgetPass.jsx'
import Home from './pages/Home.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>
  },

  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/forgetpass",
    element: <ForgetPass></ForgetPass>
  },
  {
    path: "/home",
    element: <Home></Home>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
