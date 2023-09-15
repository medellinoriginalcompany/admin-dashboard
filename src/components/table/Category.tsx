
type Props = {
  title: string,
}

const Category = (props: Props) => {
  return (
    <span className="px-3 py-0.5 rounded border uppercase border-neutral-300 text-neutral-600 text-[10px]">
      {props.title}
    </span>
  )
}

export default Category