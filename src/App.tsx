import './App.css'

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginGuard from './contexts/VerifyLogin';
import { RequireAuth } from './contexts/RequireAuth';
import Products from './pages/Products';
import ProductAdd from './pages/ProductAdd';
import ProductProperties from './pages/ProductProperties';
import Orders from './pages/Orders';
import ProductEdit from './pages/ProductEdit';
import NotFound from './pages/err/NotFound';

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path='/produtos' element={<RequireAuth><Products /></RequireAuth>} />
        <Route path='/produtos/cadastrar' element={<RequireAuth><ProductAdd /></RequireAuth>} />
        <Route path='/produtos/propriedades' element={<RequireAuth><ProductProperties /></RequireAuth>} />
        <Route path='/produtos/editar' element={<RequireAuth><ProductEdit /></RequireAuth>} />
        <Route path='/pedidos' element={<RequireAuth><Orders /></RequireAuth>} />
        <Route path="/login" element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        } />

        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </>
  )
}

export default App
