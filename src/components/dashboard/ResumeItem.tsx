
type Props = {
  title: string,
  value: string,
  icon: string,
  growth: boolean,
  growthValue?: string
}

const ResumeItem = (props: Props) => {
  return (
    <div className="flex items-start lg:space-x-2 lg:px-4 2xl:space-x-4 2xl:px-10">
      <div className="flex">
        <img src={'/icons/' + props.icon + '.svg'} alt="Receita Total" className="min-w-[30px]" draggable='false' />
      </div>

      <div>
        <p className="font-medium text-neutral-600 mb-3 2xl:text-lg dark:text-neutral-500">
          {props.title}
        </p>
        <div className="flex items-end lg:space-x-1 2xl:space-x-2">
          {props.title === 'Receita Total' &&
            <span className="font-semibold text-neutral-600 2xl:text-xl">
              R$
            </span>
          }
          <div className="flex items-center space-x-2">
            <span className="font-semibold lg:text-xl 2xl:text-3xl dark:text-gray-100">
              {props.value}
            </span>
            {props.growth ? (
              <div>
                <span className="text-green-500 text-xs font-semibold">
                  +{props.growthValue}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-red-500 text-xs font-semibold">
                  -{props.growthValue}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeItem