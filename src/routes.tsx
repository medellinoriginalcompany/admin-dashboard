import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginGuard from './contexts/VerifyLogin';
import Products from './pages/Products';
import ProductAdd from './pages/ProductAdd';
import ProductProperties from './pages/ProductProperties';
import Orders from './pages/Orders';
import ProductEdit from './pages/ProductEdit';
import NotFound from './pages/err/NotFound';
import Trash from './pages/ProductTrash';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/produtos' element={<Products />} />
      <Route path='/produtos/cadastrar' element={<ProductAdd />} />
      <Route path='/produtos/editar' element={<ProductEdit />} />
      <Route path='/produtos/propriedades' element={<ProductProperties />} />
      <Route path='/produtos/lixeira' element={<Trash />} />
      <Route path='/pedidos' element={<Orders />} />
      <Route path="/login" element={
        <LoginGuard>
          <Login />
        </LoginGuard>
      } />

      <Route path='/404' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  )
}

export default AppRoutes