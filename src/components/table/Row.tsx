
type Props = {
  content: string,
  price?: string,
  image?: string,
}

const Row = (props: Props) => {
  return (
    <td className={'pl-4 pr-10 py-4 text-left bg-primary ' + (props.price && 'flex gap-4')}>
      {
        props.image &&
        <img src={props.image} alt={props.content} className="w-14 h-14 rounded-lg object-cover" />
      }
      <div className={(props.price && 'flex flex-col')}>
        <span className={props.price && 'font-semibold'}>
          {props.content}
        </span>
        {
          props.price &&
          <span className="text-xs font-semibold text-neutral-400">
            R$ {props.price}
          </span>
        }
      </div>
    </td>
  )
}

export default Row