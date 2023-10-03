import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"

import arrowdownicon from '/icons/arrow-down-1.svg'
import ProductsAccordion from "./accordion/ProductsAccordion"

type Props = {
  icon: string
  text: string
  link: string
  accordion?: boolean
}

const NavItem = (props: Props) => {

  const [showAccordion, setShowAccordion] = useState(false);

  useEffect(() => {
    // Se clicar fora do accordion, feche-o
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.bg-neutral-300')) {
        setShowAccordion(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
  }, [])

  return (
    <>
      <NavLink to={props.link}>
        {({ isActive }) => (
          <>
            <div className={'flex items-center justify-between border-l-4 pl-8 pr-4 py-2 rounded transition-all relative '
              + (isActive ? 'bg-neutral-300 border-neutral-800 ' : 'border-transparent hover:bg-neutral-300')}>
              <div className="flex gap-2 items-center">
                <div className=''>
                  <img src={`/icons/${props.icon}.svg`} alt={props.icon} className='w-7 transition-all' />
                </div>

                <span className='font-semibold'>
                  {props.text}
                </span>
              </div>
              {
                props.accordion && (
                  <div className="">
                    <img src={arrowdownicon} alt="Arrow down" onClick={(e) => { setShowAccordion(!showAccordion); e.preventDefault(); }} draggable='false'
                      className={"w-8 p-1 duration-150 " + (showAccordion ? '-rotate-180' : '')} />
                  </div>
                )
              }

            </div>
          </>
        )}
      </NavLink>
      {
        props.accordion && showAccordion && (
          props.text === 'Produtos' && (
            <ProductsAccordion />
          )
        )
      }
    </>
  )
}

export default NavItem