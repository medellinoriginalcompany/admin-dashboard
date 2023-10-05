import { Link } from "react-router-dom"
import PropertiesRow from "./PropertiesRow"
import { ProductProperties } from "../../types/product/Properties"

type Props = {
  title: string,
  property: ProductProperties[],
  loading: boolean,
}

const PropertiesCard = (props: Props) => {
  return (
    <div className="flex space-x-5 justify-between h-96">
      <div className="bg-white/60 backdrop-blur rounded-xl py-7 px-10 space-y-5 overflow-y-scroll card w-full">
        <div className="flex justify-between sticky top-0 backdrop-blur bg-[#F3F6FB]/90 px-3 py-1 rounded-lg z-20">
          <h3 className="font-semibold text-neutral-700">
            {props.title}
          </h3>

          <Link to="/renda/mensal" className="w-fit flex space-x-2">
            <span>
              Adicionar {props.title.toLowerCase()}
            </span>
            <img src="/icons/arrow-right-1.svg" alt="arrow-right" className="w-4" draggable='false' />
          </Link>
        </div>

        <div>
          <table className="w-full">
            <thead className="text-left bg-accent backdrop-blur shadow-lg shadow-accent/10 text-white rounded-lg">
              <tr>
                <th className="pl-4 px-10  font-medium py-1 rounded-l-lg">
                  #
                </th>
                <th className="px-4 font-medium">
                  {props.title}
                </th>
                <th className="rounded-r-lg"></th>
              </tr>
            </thead>
            <tbody>
              <PropertiesRow loading={props.loading} property={props.property} type='tamanho' />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PropertiesCard