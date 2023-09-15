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
    <header className="bg-primary fixed h-screen shadow-lg">
      <nav className='px-8 py-10 flex flex-col justify-between h-full'>
        <div className='space-y-10'>
          <Link to='/dashboard'>
            <img src={logo} alt="Logo" className='w-24' />
          </Link>

          <ul className='space-y-4'>
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
        <button
          className='flex items-center w-full space-x-4 px-8 py-2 rounded-lg group transition-all hover:shadow-lg hover:text-primary hover:bg-accent/90'
          onClick={handleLogout}>
          <div className=''>
            <img src={`/icons/logout.svg`} alt='logout' className='w-7 group-hover:brightness-[6] ' />
          </div>

          <span className='font-semibold'>
            Sair
          </span>
        </button>
      </nav>
    </header>
  )
}

export default Sidebar