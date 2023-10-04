import { NavLink } from "react-router-dom"


type Props = {
  icon: string
  text: string
  link: string
}

const NavItem = (props: Props) => {

  return (
    <>
      <NavLink to={props.link}>
        {({ isActive }) => (
          <>
            <div className={'flex items-center justify-between pl-5 py-3 rounded-xl transition-all relative group '
              + (isActive ? 'bg-accent border-neutral-800 shadow-lg shadow-accent/30 ' : 'border-transparent hover:bg-accent/80')}>
              <div className="flex gap-3 items-center">
                <div className=''>
                  <img src={`/icons/${props.icon}.svg`} alt={props.icon}
                    className={'w-7 transition-all '+(isActive ? 'brightness-[6]' : 'brightness-[2] group-hover:brightness-[6]')} />
                </div>

                <span className={'font-semibold transition-all ' + (isActive ? 'text-white' : 'text-neutral-600 group-hover:text-white')}>
                  {props.text}
                </span>
              </div>
            </div>
          </>
        )}
      </NavLink>
    </>
  )
}

export default NavItem