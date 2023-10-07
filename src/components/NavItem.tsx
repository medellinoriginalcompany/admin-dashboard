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

  return (
    <>
      <NavLink to={props.link}>
        {({ isActive }) => (
          <>
            <div className={'flex items-center justify-between pl-5 rounded-xl transition-all relative group z-20 '
              + (props.more ? '' : 'py-3 ')
              + (isActive ? 'bg-accent border-neutral-800 shadow-lg shadow-accent/30 ' : 'border-transparent hover:bg-accent/80')}>
              <div className="flex gap-3 items-center">
                <div className=''>
                  <img src={`/icons/${props.icon}.svg`} alt={props.icon}
                    className={'w-7 transition-all ' + (isActive ? 'brightness-[6]' : 'brightness-[2] group-hover:brightness-[6]')} />
                </div>

                <span className={'font-semibold transition-all ' + (isActive ? 'text-white' : 'text-neutral-600 group-hover:text-white')}>
                  {props.text}
                </span>
              </div>
              {
                props.more && (
                  <div className='pl-14 pr-4 py-[18px] ' onClick={(e) => { e.preventDefault(); setShowMore(!showMore) }}>
                    <img src={`/icons/arrow-down-1.svg`} alt='arrow' className={'w-4 transition-all '
                      + (isActive ? 'brightness-[6] ' : 'brightness-[2] group-hover:brightness-[6] ')
                      + (showMore ? 'rotate-180' : 'rotate-0')} />
                  </div>
                )
              }
            </div>
          </>
        )}
      </NavLink>
      {
        props.text === 'Produtos' && showMore && (
          <div className="pl-10 py-2 w-full -z-10">
            <Link to='/produtos/cadastrar'>
              <div className="pl-5 py-2 rounded group hover:bg-accent/30">
                <span className="text-neutral-700 font-medium group-hover:text-blue-950">
                  Cadastrar produto
                </span>
              </div>
            </Link>
            <Link to='/produtos'>
              <div className="pl-5 py-2 rounded group hover:bg-accent/30">
                <span className="text-neutral-700 font-medium group-hover:text-blue-950">
                  Gerenciar produtos
                </span>
              </div>
            </Link>
            <Link to='/produtos/propriedades'>
              <div className="pl-5 py-2 rounded group hover:bg-accent/30">
                <span className="text-neutral-700 font-medium group-hover:text-blue-950">
                  Propriedades
                </span>
              </div>
            </Link>
            <Link to='/produtos/lixeira'>
              <div className="pl-5 py-2 rounded group hover:bg-accent/30">
                <span className="text-neutral-700 font-medium group-hover:text-blue-950">
                  Lixeira
                </span>
              </div>
            </Link>
          </div>
        )
      }

    </>
  )
}

export default NavItem