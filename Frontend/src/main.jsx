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
  //Department Routing 

  {
    path: '/dhome',
    element: <div><NavBar /> <DHome/> <Footer /></div>
  },
  {
    path: '/viewcriminal',
    element: <div><NavBar /> <ViewCriminalRecord/> <Footer /></div>
  },
  {
    path: '/addcriminal',
    element: <div><NavBar /> <Addcriminal/> <Footer /></div>
  },
  {
    path: '/theft/thefthome',
    element: <div><NavBar /> <Thefthome/><Footer /></div>
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
