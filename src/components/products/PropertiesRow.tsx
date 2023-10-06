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
        // Mostrar mensagem de confirmação por 3 segundos
        setConfirmationMessage(response.message);
        setTimeout(() => {
          setConfirmationMessage('');
          window.location.reload();
        }, 1000);

      } else {
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
        confirmationMessage ? (
          <div className='sticky top-10 right-0 my-3'>
            <div className="bg-green-100/80 backdrop-blur text-green-500 p-2 rounded-lg shadow-lg">
              <span>{confirmationMessage}</span>
            </div>
          </div>
        ) : null
      }
      {
        errMessage ? (
          <div className='sticky top-10 right-0 my-3'>
            <div className="bg-red-100/80 text-red-500 p-2 rounded-lg shadow-lg">
              <span>{errMessage}</span>
            </div>
          </div>
        ) : null
      }
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
    </>
  )
}

export default PropertiesRow