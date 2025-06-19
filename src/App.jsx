
import './App.css'
import React from 'react';
import MainRoutes from './Routes/MainRoutes'
import { Provider } from 'react-redux';
import { store } from './components/Redux/Store';

function App() {
  return (
   <React.StrictMode>
    <Provider store={store}>
    <MainRoutes />
    </Provider>
   </React.StrictMode>
  )
}

export default App
