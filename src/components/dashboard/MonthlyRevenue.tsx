import { Link } from "react-router-dom"

const MonthlyRevenue = () => {
  return (
    <div className="bg-white/60 backdrop-blur rounded-xl py-10 px-10 space-y-4 w-fit">
        <div className="flex justify-between">
          <h3 className="font-semibold text-neutral-700">
            Receita Mensal
          </h3>

          <Link to="/renda/mensal" className="w-fit flex space-x-2">
            <span>
              Mais detalhes
            </span>
            <img src="/icons/arrow-right-1.svg" alt="arrow-right" className="w-4" draggable='false' />
          </Link>
        </div>

      <div>
        <div className="space-x-2">
          <span className="text-lg font-medium text-neutral-400">
            R$
          </span>
          <span className="text-3xl font-semibold">
            52.875,66
          </span>
        </div>

        <div className="pt-14">
          <ul className="flex items-end space-x-5">
            <li>
              <div className="bg-gray-200 rounded w-10 h-5 shadow-accent/20"></div>
              <span className="text-neutral-500 text-sm px-2">
                Jul
              </span>
            </li>
            <li>
              <div className="bg-gray-200 rounded w-10 h-2 shadow-accent/20"></div>
              <span className="text-neutral-500 text-sm px-2">
                Ago
              </span>
            </li>
            <li>
              <div className="bg-gray-200 rounded w-10 h-12 shadow-accent/20"></div>
              <span className="text-neutral-500 text-sm px-2">
                Set
              </span>
            </li>
            <li>
              <div className="bg-accent rounded w-10 h-24 shadow-lg shadow-accent/20"></div>
              <span className="text-neutral-800 text-sm px-2">
                Out
              </span>
            </li>
            <li>
              <div className="bg-gray-200 rounded w-10 h-20 shadow-accent/20"></div>
              <span className="text-neutral-500 text-sm px-2">
                Nov
              </span>
            </li>
            <li>
              <div className="bg-gray-200 rounded w-10 h-10 shadow-accent/20"></div>
              <span className="text-neutral-500 text-sm px-2">
                Dez
              </span>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default MonthlyRevenue