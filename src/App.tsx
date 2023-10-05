import './App.css'

import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginGuard from './contexts/VerifyLogin';
import { RequireAuth } from './contexts/RequireAuth';
import Products from './pages/Products';
import ProductsAdd from './pages/ProductsAdd';
import ProductsProperties from './pages/ProductsProperties';
import Orders from './pages/Orders';

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path='/produtos' element={<RequireAuth><Products /></RequireAuth>} />
        <Route path='/produtos/cadastrar' element={<RequireAuth><ProductsAdd /></RequireAuth>} />
        <Route path='/produtos/propriedades' element={<RequireAuth><ProductsProperties /></RequireAuth>} />
        <Route path='/pedidos' element={<RequireAuth><Orders /></RequireAuth>} />
        <Route path="/login" element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        } />

        <Route path='/404' element={<Link to='/'>404</Link>} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </>
  )
}

export default App
