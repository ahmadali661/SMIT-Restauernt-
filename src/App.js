import React, { useContext } from 'react';
import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle";
import Routes from './pages/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModeContext } from './contexts/ModeContext';
import AppLoader from './components/AppLoader';

function App() {
  const {isAppLoading} = useContext(ModeContext)
  if(isAppLoading)
    return <AppLoader/>
  return (
    <>
      <Routes/>
      <ToastContainer/>
    </>
  );
}

export default App;
