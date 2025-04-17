import { StrictMode } from 'react';
import './App.css';
import { createRoot } from 'react-dom/client';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './components/Profile.jsx';
import CrimeReportForm from './components/CrimeReportForm.jsx';
import Test from './components/Test.jsx';
import AboutPage from './components/AboutPage.jsx';
import ChatbotPage from './components/Chatbotpage.jsx';
import StatusPage from './components/StatusPage.jsx';
import ChatAgent from './components/ChatAgent.jsx';
import BeAwarePage from './components/BeAwarePage.jsx';
import ViewCriminalRecord from './components/Department/ViewcriminalRecord.jsx';
import Thefthome from './components/Department/Theft/Thefthome.jsx';
import MissingPersonReport from './components/MissingPersonReport.jsx';
// Router setup
import Addcriminal from './components/Department/Addcriminal.jsx';
import DHome from './components/Department/DHome.jsx';
import MissingSearchPage from './components/MissingSearchPage.jsx';
import Murderhome from './components/Department/Murder/Murderhome.jsx';
import Missinghome from './components/Department/Missing/Missinghome.jsx';
import Cybercrimehome from './components/Department/Cybercrime/Cybercrimehome.jsx';
import CybOfficerReg from './components/Department/Cybercrime/CybOfficerReg.jsx';
import TheftOfficerReg from './components/Department/Theft/TheftOfficerReg.jsx';
import MurderOfficerReg from './components/Department/Murder/MurderOfficerReg.jsx';
import MissingOfficerReg from './components/Department/Missing/MissingOfficerReg.jsx';
import HistoryPage from './components/History.jsx';
import ForgetPassword from './components/ForgetPassword.jsx';
import TakeCase from './components/Department/Theft/TakeCase.jsx';

//Take case 

import TheftTakeCase from './components/Department/Theft/TakeCase.jsx';
import MurderTakeCase from './components/Department/Murder/TakeCase.jsx';
import CyberTakeCase from './components/Department/Cybercrime/TakeCase.jsx';
import MissingTakeCase from './components/Department/Missing/TakeCase.jsx';
import OpenCase from './components/Department/OpenCase.jsx';
import DHistory from './components/Department/DHistory.jsx';
const Router = createBrowserRouter([
  {
    path: '/',
    element: <div><NavBar /> <Home /> <Footer /></div>
  },
  {
    path: '/register',
    element: <div><NavBar /> <Register /> <Footer /></div>
  },
  {
    path: '/ForgetPassword',
    element: <div><NavBar /> <ForgetPassword /> <Footer /></div>
  },
  {
    path: '/login',
    element: <div><NavBar /> <Login /> <Footer /></div>
  },
  {
    path: '/profile',
    element: <div><NavBar /> <Profile /> <Footer /></div>
  },
  {
    path: '/CrimeReportingForm',
    element: <div><NavBar /> <CrimeReportForm /> <Footer /></div>
  },
  {
    path: '/test',
    element: <div><Test /></div>
  },
  {
    path: '/aboutpage',
    element: <div><NavBar /> <AboutPage /> <Footer /></div>
  },
  {
    path: '/chat',
    element: <div><NavBar /> <ChatAgent/> <Footer /></div>
  },
  {
    path: '/status',
    element: <div><NavBar /> <StatusPage/> <Footer /></div>
  },
  {
    path: '/beaware',
    element: <div><NavBar /> <BeAwarePage/> <Footer /></div>
  },
  {
    path: '/missingsearch',
    element: <div><NavBar /> <MissingSearchPage/> <Footer /></div>
  },
  {
    path: '/missingreport',
    element: <div><NavBar /> <MissingPersonReport/> <Footer /></div>
  },
  {
    path: '/userhistory',
    element: <div><NavBar /> <HistoryPage/><Footer /></div>
  },


  //Department Routing 

 
  {
    path: '/viewcriminal',
    element: <div><NavBar /> <ViewCriminalRecord/> <Footer /></div>
  },
  {
    path: '/addcriminal',
    element: <div><NavBar /> <Addcriminal/> <Footer /></div>
  },

  //TheftRoute
  {
    path: '/theft/thefthome',
    element: <div><NavBar /> <Thefthome/><Footer /></div>
  },
  {
    path: '/theft/theftofficerreg',
    element: <div><NavBar /> <TheftOfficerReg/><Footer /></div>
  },
  {
    path: '/theft/takecase',
    element: <div><NavBar /> <TheftTakeCase/><Footer /></div>
  },
  // {
  //   path: '/theft/OpenCase',
  //   element: <div><NavBar /> <TheftOpenCase></TheftOpenCase><Footer /></div>
  // },
// MurderRoute

  {
    path: '/murder/murderhome',
    element: <div><NavBar /> <Murderhome/><Footer /></div>
  },

  {
    path: '/murder/Murderofficerreg',
    element: <div><NavBar /> <MurderOfficerReg/><Footer /></div>
  },
  {
    path: '/murder/takecase',
    element: <div><NavBar /> <MurderTakeCase/><Footer /></div>
  },

//MissingRoute

  {
    path: '/missing/missinghome',
    element: <div><NavBar /> <Missinghome/><Footer /></div>
  },
  {
    path: '/missing/missingofficerreg',
    element: <div><NavBar /> <MissingOfficerReg/><Footer /></div>
  },
  {
    path: '/missing/takecase',
    element: <div><NavBar /> <MissingTakeCase/><Footer /></div>
  },

//Cybercrime routes

  {
    path: '/cybercrime/cybercrimehome',
    element: <div><NavBar /> <Cybercrimehome/><Footer /></div>
  },

  {
    path: '/cybercrime/cyberofficerreg',
    element: <div><NavBar /><CybOfficerReg/><Footer /></div>
  },
  {
    path: '/cybercrime/takecase',
    element: <div><NavBar /> <CyberTakeCase/> <Footer /></div>
  },

  // for admin
  // {
  //   path: '/admin/adminhome',
  //   element: <div></div>
  // }


// For all

{
  path: '/dept/dhistory',
  element: <div><NavBar /> <DHistory/><Footer /></div>
},
  
{
  path: '/dept/opencase',
  element: <div><NavBar /> <OpenCase/><Footer /></div>
},
  
  {
    path: '*',
    element: <div><PageNotFound /></div>
  }
]);

// Add chatbot iframe globally


// Render the app with chatbot
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
    {/* Add the chatbot iframe globally */}
 <ChatbotPage></ChatbotPage>
  </StrictMode>
);
