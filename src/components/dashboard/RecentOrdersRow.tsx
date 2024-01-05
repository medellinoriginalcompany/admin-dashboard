import { Link } from "react-router-dom";

type Props = {
  orderNo: string,
  date: string,
  total: string,
  status: number,
}

const RecentOrdersRow = (props: Props) => {

  let status = '';
  let color = '';

  switch (props.status) {
    case 0:
      status = 'Entregue'
      color = 'text-blue-500'
      break;
    case 1:
      status = 'Pago'
      color = 'text-green-500'
      break;
    case 2:
      status = 'Em processamento'
      color = 'text-yellow-500'
      break;
    case 3:
      status = 'Cancelado'
      color = 'text-red-500'
      break;
  }

  return (
    <tr className="">
      <td className="px-6 py-3">
        <Link to='/pedidos/20241020001-06127' className="">
          {props.orderNo}
        </Link>
      </td>
      <td className="px-6">
        {props.date}
      </td>
      <td className="px-6">
        R$ {props.total}
      </td>
      <td className="px-6">
        <div className={color}>
          {status}
        </div>
      </td>
    </tr>
  )
}

export default RecentOrdersRow