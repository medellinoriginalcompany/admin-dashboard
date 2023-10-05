import { Link } from "react-router-dom"

const RecentOrders = () => {
  return (
    <div className="bg-white/60 backdrop-blur rounded-xl w-fit overflow-y-scroll relative dashboard-card">
      <div className="p-10 space-y-4">
        <div className="flex justify-between">
          <h3 className="font-semibold text-neutral-700">
            Pedidos Recentes
          </h3>

          <Link to="" className="w-fit flex space-x-2">
            <span>
              Mais detalhes
            </span>
            <img src="/icons/arrow-right-1.svg" alt="arrow-right" className="w-4" draggable='false' />
          </Link>
        </div>

        <table className="w-full">
          <thead className="text-left bg-accent backdrop-blur shadow-lg shadow-accent/10 text-white rounded-lg">
            <th className="px-4 py-2 rounded-l-lg font-medium">
              Pedido
            </th>
            <th className="px-4 font-medium">
              Data
            </th>
            <th className="px-4 font-medium">
              Total
            </th>
            <th className="px-4 font-medium rounded-r-lg">
              Status
            </th>
          </thead>
          <tbody className="text-left">
            <tr>
              <td className="px-4 py-3">
                #857619-20231004
              </td>
              <td className="px-4">
                04/10/2023
              </td>
              <td className="px-4">
                R$ 100,00
              </td>
              <td className="px-4">
                <div className="bg-green-100 rounded-full text-green-600 px-4 py-1 text-sm text-center">
                  Pago
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders