import { ProductProperty } from '../types/product/Property';
import exclamationicon from '/icons/exclamation.svg';
import closeicon from '/icons/add.svg';

type Props = {
  type: ProductProperty[],
  close: () => void
}

const ProductAddModal = (props: Props) => {

  // Fechar o modal ao clicar fora dele
  const handleClickOutside = (e: any) => {
    if (e.target.classList.contains('fixed')) {
      props.close();
    }
  }

  return (
    <div
      className="fixed -top-8 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-10 z-50"
      onClick={handleClickOutside}

    >
      <div className="bg-white rounded border border-neutral-300 px-2 py-5 w-[800px] h-[600px] overflow-y-auto shadow-sm relative">
        <div className='flex items-center justify-between'>
          <h3 className="font-medium flex items-center">
            <img src={exclamationicon} alt="" className="w-7" />
            <span>
              Selecione a quantidade disponível para cada um
            </span>
            <span></span>
          </h3>

          <button className='cursor-pointer rounded hover:bg-red-400 group' onClick={props.close}>
            <img src={closeicon} alt="" className='rotate-45 group-hover:brightness-[6]' />
          </button>
        </div>
        <h4 className='px-7 text-sm text-neutral-500'>
          Caso não haja estoque disponível para algum tipo, deixe o campo em branco.
        </h4>

        <div className="flex flex-col gap-2 mt-5 pl-2">
          {props.type.map((type) => (
            <label htmlFor={type.Name} key={type.ID} className="flex items-center justify-between rounded pl-5 pr-2 py-1 border border-neutral-200 hover:bg-neutral-50">
              <span className="font-medium">
                {type.Name}
              </span>
              <input type="number" name={type.Name} id={type.Name} placeholder='0' min={0} style={{ MozAppearance: 'textfield' }}
                className="w-20 p-2 bg-neutral-50 border border-neutral-200 rounded-md font-normal text-center focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </label>
          ))}
        </div>

        <div className="flex items-center justify-end absolute right-0 bottom-0 p-4">
          <button className="mx-5 my-2" onClick={props.close}>
            Cancelar
          </button>
          <button className="rounded px-5 py-1.5 text-white bg-accent">
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductAddModal