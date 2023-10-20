import { ProductProperty } from '../../types/product/Property'
import { ChangeEvent, useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import ProductInput from '../form/ProductInput';

import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import closeicon from '/icons/close-circle.svg';
import { useNavigate } from 'react-router-dom';

type Props = {
  loading: boolean,
  type: string,
  property: ProductProperty[],
  name: string,
}

const PropertiesRow = (props: Props) => {

  const api = useApi();
  const type = props.type.toLowerCase();

  const [showEditArray, setShowEditArray] = useState(Array(props.property.length).fill(false));

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (type: string, id: number, name: string, description: string) => {

    try {
      const response = await api.editProperty(type, id, name, description);

      if (response) {
        setConfirmationMessage(response.message);
        const currentPage = location.pathname;  

        setTimeout(() => {
          navigate('/empty');
        }, 900);
        setTimeout(() => {
          setConfirmationMessage('');
          navigate(currentPage, { replace: true })
        }, 1000);
      }
    } catch (error: any) {
      setErrMessage(error.response.data.message);
    }
  }

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

  const handleEscape = (event: { keyCode: number; }) => {
    if (event.keyCode === 27) {
      setShowEditArray(Array(props.property.length).fill(false));
    }
  };

  const toggleShowEdit = (index: number) => {
    const updatedShowEditArray = [...showEditArray];
    updatedShowEditArray[index] = !updatedShowEditArray[index];
    setShowEditArray(updatedShowEditArray);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <>
      {confirmationMessage ? (
        <div className='sticky top-10 right-0 my-3'>
          <div className="bg-green-100/80 backdrop-blur text-green-500 p-2 rounded-lg shadow-lg">
            <span>{confirmationMessage}</span>
          </div>
        </div>
      ) : null}
      {errMessage ? (
        <div className='sticky top-10 right-0 my-3'>
          <div className="bg-red-100/80 text-red-500 p-2 rounded-lg shadow-lg">
            <span>{errMessage}</span>
          </div>
        </div>
      ) : null}


      {props.loading ? (<tr><td>Carregando...</td></tr>) :
        props.property?.map((param, index) => {
          return (
            <tr key={param.ID}>
              <td className="px-4 py-3">
                {index + 1}
              </td>
              <td className="px-4">
                {param.Name}
              </td>
              <td className="relative">
                <div className="space-x-2 mx-4 float-right">
                  <button className="bg-sky-200/80 p-2 rounded-full hover:bg-sky-300/80" onClick={() => toggleShowEdit(index)}>
                    <img src={editicon} alt='edit' className='w-3 ' draggable='false' />
                  </button>
                  <button onClick={() => handleDelete(param.ID, param.Name)} className="bg-red-200/80 p-2 rounded-full hover:bg-red-300/80">
                    <img src={deleteicon} alt='delete' className='w-3' draggable='false' />
                  </button>
                </div>
              </td>
              {showEditArray[index] ? (
                <td className="absolute top-0 left-0 w-full bg-neutral-800/20 z-50">
                  <div className="flex flex-col justify-center h-screen mx-auto max-w-xl">
                    <div className="bg-white p-10 rounded relative">
                      <div className="absolute top-0 right-0 p-3 cursor-pointer" onClick={() => { toggleShowEdit(index) }}>
                        <img src={closeicon} alt="" />
                      </div>
                      <form className="space-y-5" onSubmit={() => {handleSubmit(props.type, param.ID, name, description)}}>
                        <h2 className="text-xl font-semibold">Editar propriedade</h2>
                        <ProductInput
                          label={"Editar (" + props.name + ")"}
                          name={param.Name}
                          type="text"
                          value={name}
                          handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
                          maxLength={50}
                          placeholder={param.Name}
                          autoFocus
                        />
                        <ProductInput
                          label="Descrição (não obrigatório)"
                          name={props.name}
                          type="text"
                          value={param.Description!}
                          handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setDescription(e.target.value) }}
                          maxLength={50}
                          placeholder={param.Description}
                        />

                        <div className="flex justify-end">
                          <button type="submit" disabled={!props.name}
                            className="bg-accent text-primary rounded-lg w-fit px-8 py-2 font-semibold flex items-center shadow-lg hover:bg-neutral-900">
                            Cadastrar
                          </button>
                        </div>
                      </form>
                      {
                        confirmationMessage && (
                          <div className='absolute bottom-0 left-0 m-5'>
                            <div className="bg-green-100 text-green-500 px-3 py-2 rounded-lg shadow-lg">
                              <span>{confirmationMessage}</span>
                            </div>
                          </div>
                        )
                      }
                      {
                        errMessage && (
                          <div className='absolute bottom-0 left-0 m-5'>
                            <div className="bg-red-100 text-red-500 px-3 py-2 rounded-lg shadow-lg shadow-red-500/20">
                              <p>
                                Erro: <span>{errMessage}</span>
                              </p>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </td>
              ) : null}
            </tr>
          )
        })}
    </>
  )
}

export default PropertiesRow