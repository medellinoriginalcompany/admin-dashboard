import { Link } from 'react-router-dom'
import NavItem from './NavItem'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import logo from '/images/medellin-black.png'

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      auth.logout();
    }
  }

  return (
    <div className="bg-primary sticky top-0 min-w-[250px] h-screen z-50">
      <nav className='flex flex-col justify-between h-full'>
        <div className='space-y-7'>
          <div className='py-8'>
            <Link to='/dashboard'>
              <img src={logo} alt="Logo" className='w-24 mx-auto' />
            </Link>

          </div>

          <ul className='space-y-4 px-8'>
            <li>
              <NavItem
                icon='graph'
                text='Dashboard'
                link='/dashboard'
              />
            </li>
            <li>
              <NavItem
                icon='box-1'
                text='Produtos'
                link='/produtos'
              />
            </li>
          </ul>
        </div>
        <div className='px-8 py-10'>
          <button
            className='flex items-center w-full space-x-4 px-8 py-2 rounded-lg group transition-all hover:shadow-lg hover:text-primary hover:bg-accent/90'
            onClick={handleLogout}>
            <div className=''>
              <img src={`/icons/logout.svg`} alt='logout' className='w-7 group-hover:brightness-[6] transition-all' />
            </div>

            <span className='font-semibold'>
              Sair
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar