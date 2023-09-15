import { NavLink } from "react-router-dom"

type Props = {
  icon: string
  text: string
  link: string
}

const NavItem = (props: Props) => {

  return (
    <NavLink to={props.link}>
      {({ isActive }) => (
        <>
          <div className={'flex items-center space-x-4 px-8 py-2 rounded-lg transition-all ' + (isActive ? 'bg-accent text-primary shadow-lg' : 'group hover:text-primary hover:bg-accent/80')}>
            <div className=''>
              <img src={`/icons/${props.icon}.svg`} alt={props.icon} className={'w-7 ' + (isActive ? 'brightness-[6]' : 'group-hover:brightness-[6]')} />
            </div>

            <span className='font-semibold'>
              {props.text}
            </span>
          </div>
        </>
      )}
    </NavLink>
  )
}

export default NavItem