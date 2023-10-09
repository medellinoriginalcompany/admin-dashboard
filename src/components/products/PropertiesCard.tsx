import PropertiesRow from "./PropertiesRow"
import { ProductProperty } from "../../types/product/Property"
import { useState, ChangeEvent, useEffect } from "react"
import ProductInput from "../form/ProductInput"
import { useNavigate } from "react-router-dom"
import { useApi } from "../../hooks/useApi"

import closeicon from "/icons/close-circle.svg"

type Props = {
  title: string,
  property: ProductProperty[],
  loading: boolean,
}

const PropertiesCard = (props: Props) => {

  const api = useApi();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');

  const [showAddProperty, setShowAddProperty] = useState<boolean>(false);
  const handleClick = () => {
    setShowAddProperty(!showAddProperty);
  }
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await api.addProductProperty(props.title.toLowerCase(), name, description);
      
      if (response) {
        setConfirmationMessage(response.message);
        const currentPage = location.pathname;
        
        setTimeout(() => {
          navigate('/empty');
        }, 900);
        setTimeout(() => {
          setConfirmationMessage('');
          navigate(currentPage, {replace: true})
        }, 1000);
      }
    } catch (error: any) {
      setErrMessage(error.response.data.message);
    }
  }

  const handleEscape = (event: { keyCode: number; }) => {
    if (event.keyCode === 27) {
      setShowAddProperty(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);


  return (
    <>
      <div className="flex justify-between h-96">
        <div className="bg-white/60 rounded py-7 px-10 space-y-5 overflow-y-scroll card w-full">
          <div className="flex justify-between sticky top-0 bg-[#F3F6FB]/90 px-3 py-1 rounded-lg z-20">
            <h3 className="font-semibold text-neutral-700">
              {props.title}
            </h3>

            <button onClick={handleClick} className="w-fit flex items-center space-x-2 px-3 rounded hover:bg-accent/20">
              <span>
                Adicionar {props.title.toLowerCase()}
              </span>
              <img src="/icons/arrow-right-1.svg" alt="arrow-right" className="w-4" draggable='false' />
            </button>
          </div>

          <div>
            <table className="w-full">
              <thead className="text-left bg-accent shadow-lg shadow-accent/10 text-white rounded-lg">
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
                <PropertiesRow loading={props.loading} property={props.property} type={props.title.toLowerCase()} />
              </tbody>
            </table>
          </div>

        </div>
      </div>
      {
        showAddProperty && (
          <div className="absolute top-0 left-0 w-full bg-neutral-800/20 z-50">
            <div className="flex flex-col justify-center h-screen mx-auto max-w-xl">
              <div className="bg-white p-10 rounded relative">
                <div className="absolute top-0 right-0 p-3 cursor-pointer" onClick={handleClick}>
                  <img src={closeicon} alt="" />
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <ProductInput
                    label={"Adicionar novo (" + props.title + ")"}
                    name={props.title.toLowerCase()}
                    type="text"
                    value={name}
                    handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
                    maxLength={50}
                    placeholder="Digite a nova propriedade"
                    autoFocus
                  />
                  <ProductInput
                    label="Descrição (não obrigatório)"
                    name={props.title.toLowerCase()}
                    type="text"
                    value={description}
                    handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setDescription(e.target.value) }}
                    maxLength={50}
                    placeholder="Digite a descrição da propriedade"
                  />

                  <div className="flex justify-end">
                    <button type="submit" disabled={!name}
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
          </div>
        )
      }
    </>
  )
}

export default PropertiesCard