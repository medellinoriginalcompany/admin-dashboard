import { Link } from 'react-router-dom'
import NavItem from './NavItem'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import logo from '/images/medellin-black.png'

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      auth.logout();
    }
  }

  return (
    <div className=" sticky top-0 lg:min-w-[280px] 2xl:min-w-[310px] h-screen z-50">
      <nav className='flex flex-col justify-between h-full'>
        <div className='space-y-7'>
          <div className='mt-8 mb-24 w-fit'>
            <Link to='/dashboard'>
              <img src={logo} alt="Logo" className='w-24 ml-10' />
            </Link>
          </div>

          <ul className='space-y-3 px-9'>
            <li>
              <NavItem
                icon='graph'
                text='Dashboard'
                link='/dashboard'
              />
            </li>
            <li>
              <NavItem
                icon='box'
                text='Produtos'
                link='/produtos'
                more
              />
            </li>
            <li>
              <NavItem
                icon='shopping-cart'
                text='Pedidos'
                link='/pedidos'
              />
            </li>
            <li>
              <NavItem
                icon='profile-circle'
                text='Usuários'
                link='/usuarios'
              />
            </li>
            <li>
              <NavItem
                icon='document-text-1'
                text='Logs'
                link='/logs'
              />
            </li>
          </ul>
        </div>
        <div className='px-8 py-10'>
          <button
            className='flex items-center w-full space-x-3 px-8 py-2 rounded-lg hover:bg-accent/20'
            onClick={handleLogout}>
            <div className=''>
              <img src={`/icons/logout-1.svg`} alt='logout' className='w-7 transition-all rotate-180 brightness-[2]' />
            </div>

            <span className='font-semibold text-neutral-700'>
              Sair
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar