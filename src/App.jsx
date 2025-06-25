
import './App.css'
import React from 'react';
import MainRoutes from './Routes/MainRoutes'
import { Provider } from 'react-redux';
import { store } from './components/Redux/Store';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
   <React.StrictMode>
    <Provider store={store}>
    <MainRoutes />
    <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
   </React.StrictMode>
  )
}

export default App
