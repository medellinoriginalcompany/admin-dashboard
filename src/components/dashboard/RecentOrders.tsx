import { Link } from "react-router-dom"
import RecentOrdersRow from "./RecentOrdersRow"

const RecentOrders = () => {
  return (
    <div className="bg-gray-50 rounded-xl w-fit overflow-y-scroll relative card dark:bg-neutral-900">
      <div className="p-10 space-y-4">
        <div className="flex justify-between">
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-500">
            Pedidos Recentes
          </h3>

          <Link to="" className="w-fit flex space-x-2 dark:text-neutral-400">
            <span>
              Mais detalhes
            </span>
            <img src="/icons/arrow-right-1.svg" alt="arrow-right" className="w-4 brightness-[6]" draggable='false' />
          </Link>
        </div>

        <table className="w-fit">
          <thead className="sticky top-5 text-left bg-accent backdrop-blur text-white dark:bg-neutral-800">
            <tr>
              <th className="px-6 py-2 rounded-l-md font-medium">
                Pedido
              </th>
              <th className="px-6 font-medium">
                Data
              </th>
              <th className="px-6 font-medium">
                Total
              </th>
              <th className="px-6 font-medium rounded-r-md">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-left dark:text-neutral-100">
            <RecentOrdersRow
              orderNo="#20241020001-06127"
              date="20/10/2021"
              total="1.200,00"
              status={0}
            />
            <RecentOrdersRow
              orderNo="#20241020001-06127"
              date="20/10/2021"
              total="1.200,00"
              status={1}
            />
            <RecentOrdersRow
              orderNo="#20231020001-06127"
              date="20/10/2021"
              total="1.200,00"
              status={2}
            />
            <RecentOrdersRow
              orderNo="#20231020001-06127"
              date="20/10/2021"
              total="1.200,00"
              status={3}
            />
            <RecentOrdersRow
              orderNo="#20231020001-06127"
              date="20/10/2021"
              total="1.200,00"
              status={0}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders