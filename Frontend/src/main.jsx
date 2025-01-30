import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import CFooter from './components/Footer.jsx'
// import Register from './components/Register.jsx'
// import Login from './components/Login.jsx'
import {BrowserRouter,createBrowserRouter,RouterProvider} from 'react-router-dom'


// const Router=createBrowserRouter([
//   {
//     path:'/',
//     element:<div><NavBar/> <Home/><CFooter/>  </div>
  
//   },
//   {
//     path:'/register',
//     element:<div><Register/></div>
  
//   },
//   {
//     path:'/login',
//     element:<div><Login/></div>
  
//   },
//   ])




createRoot(document.getElementById('root')).render(

    <App />

)
