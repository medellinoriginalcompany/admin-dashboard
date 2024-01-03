import { Link } from "react-router-dom"

const RecentOrders = () => {
  return (
    <div className="bg-gray-50 rounded-xl w-fit overflow-y-scroll relative card">
      <div className="p-10 space-y-4">
        <div className="flex justify-between">
          <h3 className="font-semibold text-neutral-800">
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
          <thead className="text-left bg-accent backdrop-blur text-white">
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
          <tbody className="text-left">
            <tr>
              <td className="px-6 py-3">
                #20231020001-06127
              </td>
              <td className="px-6">
                20/10/2023
              </td>
              <td className="px-6">
                R$ 100,00
              </td>
              <td className="px-6">
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