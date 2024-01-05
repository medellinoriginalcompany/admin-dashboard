import { Link } from 'react-router-dom'
import NavItem from './NavItem'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import logo from '/images/medellin-black.png'
import usericon from '/images/user_icon.jpg';
import moreicon from '/icons/more.svg';
import sunicon from '/icons/sun-1.svg';
import moonicon from '/icons/moon.svg';
import notificationicon from '/icons/notification.svg';

const Sidebar = () => {
  const auth = useContext(AuthContext);

  const [profileOptions, setProfileOptions] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      auth.logout();
    }
  }

  const changeTheme = () => {
    const html = document.documentElement;
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      html.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      html.classList.add('dark');
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setProfileOptions]);

  return (
    <div className="sticky top-0 lg:min-w-[280px] 2xl:min-w-[310px] h-screen z-50 bg-neutral-50 border-r border-neutral-200">
      <nav className='flex flex-col justify-between h-full'>
        <div className='space-y-7'>
          <div className='flex items-center justify-between mx-9 mt-8 mb-24'>
            <div className='w-fit'>
              <Link to='/dashboard'>
                <img src={logo} alt="Logo" className='w-24' />
              </Link>
            </div>
            <div className='relative flex items-center space-x-2'>
              <img src={notificationicon} alt='bell' className='w-7' />
              <span className='bg-red-500 rounded-full text-[10px] text-primary text-center w-4 h-4 absolute top-0 right-0 font-semibold'>
                8
              </span>
            </div>
          </div>

          <ul className='space-y-2 px-9'>
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

        {profileOptions && (
          <div className='absolute bottom-32 right-2 py-3 px-3 ml-12 space-y-3 rounded bg-neutral-50 border border-neutral-300 shadow-sm z-20'>
            <button onClick={changeTheme}
              className='w-fit px-8 py-1.5 rounded bg-neutral-100 border border-neutral-300 hover:bg-neutral-200'>
              <img src={moonicon} alt="" className='w-4 left-0 dark:hidden' />
              <img src={sunicon} alt="" className='w-4 left-0 hidden dark:block' />
            </button>
            <button
              className='flex items-center justify-center w-full space-x-2 px-8 py-1.5 rounded bg-neutral-100 border border-neutral-300 hover:bg-neutral-200'>
              <span className='font-semibold text-sm text-neutral-700'>
                Alterar foto de perfil
              </span>
            </button>

            <button onClick={handleLogout}
              className='flex items-center justify-center w-full space-x-2 px-8 py-1.5 rounded bg-red-50 hover:bg-red-100'>
              <span className='font-semibold text-sm text-red-500'>
                Sair da conta
              </span>
            </button>
          </div>
        )}

        <div className='bg-neutral-100 border-t border-neutral-200 px-2 pt-3' ref={profileRef}>
          <div onClick={() => setProfileOptions(!profileOptions)}
            className='flex items-center justify-between px-4 py-2 mb-5 rounded cursor-pointer hover:bg-neutral-200'>
            <div className='flex items-center gap-3'>
              <img src={usericon} alt='user' className='w-8 h-8 object-cover rounded-full' />
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-neutral-800'>
                  {auth.user?.FirstName + ' ' + auth.user?.LastName}
                </span>
                <span title={auth.user?.Email} className='text-xs text-neutral-400 overflow-x-hidden text-ellipsis whitespace-nowrap w-40'>
                  {auth.user?.Email}
                </span>
              </div>
            </div>
            <img src={moreicon} alt="" />
          </div>

          <p className='text-xs text-center pb-4 text-neutral-500'>
            &copy; Medellin Original Company 2024. <br />Todos os direitos reservados.
          </p>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar