import { ProductProperty } from '../../types/product/Property'

import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import { useApi } from '../../hooks/useApi';
import { useState } from 'react';

type Props = {
  loading: boolean,
  type: string,
  property: ProductProperty[],
}

const PropertiesRow = (props: Props) => {

  const api = useApi();
  const type = props.type.toLowerCase();

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm("Tem certeza que deseja excluir a propriedade " + name + "?")) {
      const response = await api.delete(type, id);
      if (response) {
        console.log('Deletado com sucesso');
        // Mostrar mensagem de confirmação por 3 segundos
        setConfirmationMessage(response.message);
        setTimeout(() => {
          setConfirmationMessage('');
        }, 3000);

      } else {
        console.log("Ocorreu um erro ao excluir");
        setErrMessage(response.message);
        setTimeout(() => {
          setErrMessage('');
        }, 5000);
      }
    }
  }

  return (
    <>
      {
        props.loading ? (<tr><td>Carregando...</td></tr>) :
          props.property?.map((param, index) => {
            return (
              <tr key={param.ID}>
                <td className="px-4 py-3">
                  {index}
                </td>
                <td className="px-4">
                  {param.Name}
                </td>
                <td className="relative">
                  <div className="space-x-2 mx-4 float-right">
                    <button className="bg-sky-200/80 p-2 rounded-full hover:bg-sky-300/80">
                      <img src={editicon} alt='edit' className='w-3 ' draggable='false' />
                    </button>
                    <button onClick={() => handleDelete(param.ID, param.Name)} className="bg-red-200/80 p-2 rounded-full hover:bg-red-300/80">
                      <img src={deleteicon} alt='delete' className='w-3' draggable='false' />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })
      }

      {
        confirmationMessage ? (
          <div className='absolute bottom-0 right-0'>
            <div className="bg-green-400 text-white p-2 rounded-lg shadow-lg">
              {confirmationMessage}
            </div>
          </div>
        ) : null
      }
      {
        errMessage ? (
          <div className='absolute bottom-0 right-0'>
            <div className="bg-red-400 text-white p-2 rounded-lg shadow-lg">
              {errMessage}
            </div>
          </div>
        ) : null
      }
    </>
  )
}

export default PropertiesRow