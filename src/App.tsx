import './App.css'

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginGuard from './contexts/VerifyLogin';
import { RequireAuth } from './contexts/RequireAuth';

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/login" element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        } />

        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </>
  )
}

export default App
