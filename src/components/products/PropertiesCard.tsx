import PropertiesRow from "./PropertiesRow"
import { ProductProperty } from "../../types/product/Property"
import { useState, ChangeEvent, useEffect } from "react"
import ProductInput from "../form/ProductInput"
import { useNavigate } from "react-router-dom"
import { useApi } from "../../hooks/useApi"

import externalicon from '/icons/external.svg';
import exclamationicon from '/icons/exclamation.svg';
import closeicon from '/icons/add.svg';

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
  const close = () => {
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
          navigate(currentPage, { replace: true })
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
      <div className="flex justify-between h-96 shadow-sm">
        <div className="bg-neutral-50 border border-neutral-300 rounded pt-3 px-10 overflow-y-scroll card w-full">
          <div className="flex items-center justify-between sticky top-0 bg-neutral-100 border border-neutral-300 px-3 py-1 rounded-md z-20">
            <h3 className="font-semibold text-neutral-700">
              {props.title}
            </h3>

            <button onClick={close} type="button"
              className="bg-neutral-200 border border-neutral-300 flex items-center justify-between gap-2 w-52 -mr-2 py-1 rounded font-medium text-sm group duration-75 hover:bg-accent hover:text-white hover:border-neutral-800">
              <span className="mx-auto">
                Adicionar {props.title.toLowerCase()}
              </span>
              <img src={externalicon} alt="" className="group-hover:brightness-[6] -ml-10 mr-3 w-4 -scale-x-100 duration-75" />
            </button>
          </div>

          <div>
            <table className="w-full border-separate border-spacing-y-2">
              <thead className="text-left bg-accent text-white sticky top-12 z-10">
                <tr>
                  <th className="pl-4 px-10 font-medium py-1 rounded-l">
                    #
                  </th>
                  <th className="px-4 font-medium">
                    Nome
                  </th>
                  <th className="rounded-r"></th>
                </tr>
              </thead>
              <tbody className="[&>*:nth-child(even)]:bg-neutral-100">
                <PropertiesRow loading={props.loading} property={props.property} type={props.title.toLowerCase()} name={props.title} />
              </tbody>
            </table>
          </div>

        </div>
      </div>
      {
        showAddProperty && (
          <div className="absolute top-0 left-0 w-full bg-neutral-800/10 z-50">
            <div className="flex flex-col justify-center h-screen mx-auto w-fit">
              <div className="bg-white rounded border border-neutral-300 px-12 py-9 w-[800px] h-[400px] relative shadow-sm">
                <div className='flex items-center justify-between'>
                  <h3 className="font-medium flex items-center">
                    <img src={exclamationicon} alt="" className="w-7" />
                    <span>
                      Insira o nome da nova propriedade
                    </span>
                  </h3>

                  <button className='cursor-pointer rounded hover:bg-red-400 group' onClick={close}>
                    <img src={closeicon} alt="" className='rotate-45 group-hover:brightness-[6]' />
                  </button>
                </div>
                <h4 className='px-7 mb-6 font-medium text-sm text-neutral-500'>
                  VOCÊ ESTÁ ADICIONANDO <span className="font-bold text-red-400">{props.title.toUpperCase()}</span>!
                </h4>
                <form className="space-y-4 px-7" onSubmit={handleSubmit}>
                  <ProductInput
                    label={"Nome"}
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

                  <div className="flex items-center justify-end absolute right-0 bottom-0 p-4">
                    <button className="mx-5 my-2" type="button" onClick={close}>
                      Cancelar
                    </button>
                    <button disabled={!name}
                      className="rounded px-5 py-1.5 text-white bg-accent disabled:bg-neutral-100 border disabled:border-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed">
                      Salvar
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