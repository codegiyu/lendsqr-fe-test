import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Alert from './components/Alert';
import ErrorBoundary from './components/ErrorBoundary';
import NoPage from './pages/404';

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
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
