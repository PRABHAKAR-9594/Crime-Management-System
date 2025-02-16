import { StrictMode } from 'react'
import './App.css'
import { createRoot } from 'react-dom/client'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import {BrowserRouter,createBrowserRouter,RouterProvider} from 'react-router-dom'
import Profile from './components/Profile.jsx'
import CrimeReportForm from './components/CrimeReportForm.jsx'
import Test from './components/Test.jsx'
const Router=createBrowserRouter([
  {
    path:'/',
    element:<div><NavBar/> <Home/><Footer/>  </div>
  
  },
  {
    path:'/register',
    element:<div><NavBar/> <Register/> <Footer/></div>
  
  },

  // After Adding the login page Add the path and elememt

  {
    path:'/login',
    element:<div><NavBar /> <Login /> <Footer /></div>
  
  },
  {
    path:'/profile',
    element:<div><NavBar /> <Profile></Profile> <Footer /></div>
  
  },
  {
    path:'/CrimeReportingForm',
    element:<div><NavBar /> <CrimeReportForm></CrimeReportForm> <Footer /></div>
  
  },
  {
    path:'/test',
    element:<div><Test></Test></div>
  
  },
  {
    path:'*',
    element:<div><PageNotFound></PageNotFound></div>
  }
  ])




createRoot(document.getElementById('root')).render(
<StrictMode>
    <RouterProvider router={Router}>
    </RouterProvider>
    </StrictMode>

)
