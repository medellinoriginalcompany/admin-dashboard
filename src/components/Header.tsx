import notificationicon from '/icons/notification.svg';
import usericon from '/icons/user-square.svg';

type Props = {
  placeholder: string,
}

const Header = (props: Props) => {
  return (
    <div className='bg-primary shadow-b'>
      <div className='flex items-center justify-between px-8 py-5'>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <form method="get">
              <input type='search' placeholder={props.placeholder} name="search" id="search"
                className='w-96 px-4 py-2 rounded-lg bg-neutral-100 border border-neutral-300 appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50' />
              <button type="submit" className="absolute top-0 right-0 border border-neutral-300 px-3 py-3 rounded-r-lg bg-neutral-200 hover:bg-neutral-300">
                <img src='/icons/search-normal-1.svg' alt='search' className='w-4' />
              </button>
            </form>
          </div>
        </div>
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
              Admin
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header