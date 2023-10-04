import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import notificationicon from '/icons/notification.svg';
import usericon from '/icons/user-square.svg';

const Header = () => {
  const auth = useContext(AuthContext);
  
  return (
    <div className='flex items-center justify-end my-6 pr-10 sticky top-0 w-full'>
      <div className='flex items-center space-x-6'>
        <div className='relative flex items-center space-x-2'>
          <img src={notificationicon} alt='bell' className='w-7' />
          <span className='bg-red-500 rounded-full text-[10px] text-primary text-center w-4 h-4 absolute top-0 right-0 font-semibold'>
            8
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <img src={usericon} alt='user' className='w-7' />
          <span className='font-semibold'>
            {auth.user?.FirstName + ' ' + auth.user?.LastName}
          </span>
        </div>
      </div>
    </div>

  )
}

export default Header