
type Props = {
  content: string,
  left?: boolean,
  right?: boolean
}

const HeadRow = (props: Props) => {
  return (
    <th className={"pl-4 pr-10 py-4 text-left text-white font-semibold " + (props.left ? 'rounded-l-lg ' : '') + (props.right ? 'rounded-r-lg ' : '')}>{props.content}</th>
  )
}

export default HeadRow