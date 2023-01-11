import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Alert from './components/Alert';
import ErrorBoundary from './components/ErrorBoundary';
import NoPage from './pages/404';
import User from './pages/User';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Alert />
      </ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
