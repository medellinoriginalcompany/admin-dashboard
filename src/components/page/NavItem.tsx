import { useState } from "react";
import { Link, NavLink } from "react-router-dom";


type Props = {
  icon: string,
  text: string,
  link: string,
  more?: boolean,
}

const NavItem = (props: Props) => {

  const [showMore, setShowMore] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMore(!showMore)
  }

  return (
    <>
      <NavLink to={props.link}>
        {({ isActive }) => (
          <div className={'flex items-center justify-between pl-5 rounded-md transition-all relative group z-20 '
            + (props.more ? '' : 'py-2.5 ')
            + (isActive ? 'bg-accent dark:bg-accent-dark ' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800')}>
            <div className="flex gap-3 items-center">
              <div className=''>
                <img src={`/icons/${props.icon}.svg`} alt={props.icon}
                  className={'w-6 transition-all translate-y-0.5 ' + (isActive ? 'brightness-[6] dark:brightness-0 ' : 'dark:brightness-[6]')} />
              </div>

              <span className={'font-semibold transition-all ' + (isActive ? 'text-neutral-50 dark:text-neutral-800' : 'text-neutral-800 dark:text-gray-100')}>
                {props.text}
              </span>
            </div>
            {
              props.more && (
                <button className='pl-14 pr-4 py-[18px] ' onClick={handleClick}>
                  <img src={`/icons/arrow-down-1.svg`} alt='arrow' className={'w-3 transition-all '
                    + (isActive ? 'brightness-[6] dark:brightness-0 ' : 'brightness-[2] dark:brightness-[6] ')
                    + (showMore ? 'rotate-180' : 'rotate-0')} />
                </button>
              )
            }
          </div>
        )}
      </NavLink>
      {props.text === 'Produtos' && showMore && (
        <div className="pl-10 py-2 w-full -z-10">
          <Link to='/produtos/cadastrar'>
            <div className="pl-5 py-2 rounded group hover:bg-neutral-200 dark:hover:bg-neutral-800">
              <span className="text-neutral-800 font-medium dark:text-gray-100">
                Cadastrar produto
              </span>
            </div>
          </Link>
          <Link to='/produtos'>
            <div className="pl-5 py-2 rounded group hover:bg-neutral-200 dark:hover:bg-neutral-800">
              <span className="text-neutral-800 font-medium dark:text-gray-100">
                Gerenciar produtos
              </span>
            </div>
          </Link>
          <Link to='/produtos/propriedades'>
            <div className="pl-5 py-2 rounded group hover:bg-neutral-200 dark:hover:bg-neutral-800">
              <span className="text-neutral-800 font-medium dark:text-gray-100">
                Propriedades
              </span>
            </div>
          </Link>
          <Link to='/produtos/lixeira'>
            <div className="pl-5 py-2 rounded group hover:bg-neutral-200 dark:hover:bg-neutral-800">
              <span className="text-neutral-800 font-medium dark:text-gray-100">
                Lixeira
              </span>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default NavItem