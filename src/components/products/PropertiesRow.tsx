import { ProductProperties } from '../../types/product/Properties'

import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import { useApi } from '../../hooks/useApi';

type Props = {
  loading: boolean,
  type: string,
  property: ProductProperties[],
}

const PropertiesRow = (props: Props) => {

  const api = useApi();
  const type = props.type.toLowerCase();

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm("Tem certeza que deseja excluir a propriedade " + name + "?")) {
      const response = await api.delete(type, id);
      if (response) {
        console.log('Deletado com sucesso');

      } else {
        console.log("Ocorreu um erro ao excluir");
      }
    }
  }

  return (
    <>
      {
        props.loading ? (<tr><td>Carregando...</td></tr>) :
          props.property?.map((param) => {
            return (
              <tr key={param.ID}>
                <td className="px-4 py-3">
                  {param.ID}
                </td>
                <td className="px-4">
                  {param.Name}
                </td>
                <td className="relative">
                  <div className="space-x-2 mx-4 float-right">
                    <button className="bg-sky-200/80 p-2 rounded-full hover:bg-sky-300/80">
                      <img src={editicon} alt='edit' className='w-3' draggable='false' />
                    </button>
                    <button onClick={async () => { await handleDelete(param.ID, param.Name); }} className="bg-red-200/80 p-2 rounded-full hover:bg-red-300/80">
                      <img src={deleteicon} alt='delete' className='w-3' draggable='false' />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })
      }
    </>
  )
}

export default PropertiesRow