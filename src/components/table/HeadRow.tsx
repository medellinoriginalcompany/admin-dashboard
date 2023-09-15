
type Props = {
  content: string,
}

const HeadRow = (props: Props) => {
  return (
    <th className="pl-4 pr-10 py-4 text-left ">{props.content}</th>
  )
}

export default HeadRow