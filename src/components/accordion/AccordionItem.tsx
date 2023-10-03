import { NavLink } from "react-router-dom"

type Props = {
  link: string,
  content: string
}

const AccordionItem = (props: Props) => {
  return (
    <NavLink to={props.link} >
      <li className="py-2 px-6 rounded-r font-medium hover:bg-neutral-400">
        {props.content}
      </li>
    </NavLink>
  )
}

export default AccordionItem