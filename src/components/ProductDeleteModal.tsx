import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { motion } from 'framer-motion';

import exclamationicon from '/icons/exclamation.svg';
import closeicon from '/icons/add.svg';

type Props = {
  id: number,
  name: string,
  close: () => void,
}

const ProductDeleteModal = (props: Props) => {

  const api = useApi();

  const [successMessage, setSuccessMessage] = useState('');
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fechar o modal ao clicar fora dele
  const handleClickOutside = (e: any) => {
    if (e.target.classList.contains('fixed')) {
      props.close();
    }
  }

  const handleDelete = async () => {
    setErrMsg('');
    setSuccessMessage('');

    try {
      setLoading(true);
      const response = await api.deleteProduct(props.id);

      if (response) {
        setTimeout(() => {
          setLoading(false);
          setSuccessMessage(response.message);
        }, 1100);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error: any) {
      setLoading(false);
      setSuccessMessage('');
      setErrMsg(error.response.data.message);
    }
  }

  return (
    <div
      className="fixed -top-8 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-10 z-50 dark:bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded border border-neutral-300 px-2 py-5 w-[500px] h-[300px] overflow-y-auto shadow-sm relative dark:bg-neutral-915 dark:border-neutral-800">
        <div className='flex items-center justify-between'>
          <h3 className="font-medium flex items-center">
            <img src={exclamationicon} alt="" className="w-7" />
            <span className='dark:text-neutral-500'>
              Tem certeza que desejar deletar este produto?
            </span>
          </h3>

          <button className='cursor-pointer rounded hover:bg-red-400 group' onClick={props.close}>
            <img src={closeicon} alt="" className='rotate-45 group-hover:brightness-[6]' />
          </button>
        </div>
        <h4 className='px-7 text-sm text-neutral-500 dark:text-neutral-600'>
          Este produto será movido para a LIXEIRA.
        </h4>

        <div className="w-fit my-10 m-auto">
          <span className='bg-neutral-50 border border-neutral-300 text-neutral-500 shadow-sm px-4 rounded whitespace-wrap dark:bg-neutral-800 dark:border-neutral-700'>
            {props.name}
          </span>
        </div>

        {loading && (
          <motion.div className='bg-blue-50 flex items-center justify-end gap-5 absolute right-0 bottom-14 px-4 py-2 m-4 rounded'
            initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
            animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
            }}
          >
            <p className='text-blue-500 font-medium text-center'>
              Deletando...
            </p>
            <div className='w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin'></div>
          </motion.div>
        )}
        {successMessage && (
          <motion.div className='bg-green-50 flex items-center justify-end gap-5 absolute right-0 bottom-14 px-4 py-2 m-4 rounded'
            initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
            animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
            }}
          >
            <p className='text-green-500 font-medium text-center flex items-center gap-2'>
              {successMessage} <img src="/icons/check.svg" alt="" className='w-5' />
            </p>
          </motion.div>
        )}
        {errMsg && (
          <motion.div className='bg-red-50 flex items-center justify-end gap-5 absolute right-0 bottom-14 px-4 py-2 m-4 rounded'
            initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
            animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
            }}
          >
            <p className='text-red-500 font-medium text-center flex items-center gap-2'>
              {errMsg} <img src="/icons/danger-red-outline.svg" alt="" className='w-5' />
            </p>
          </motion.div>
        )}

        <div className="flex items-center justify-end absolute right-0 bottom-0 p-4">
          <button className="mx-5 my-2 dark:text-neutral-500" onClick={props.close}>
            Cancelar
          </button>
          <button className="rounded px-5 py-1.5 text-white bg-accent dark:bg-accent-dark dark:text-neutral-800" onClick={handleDelete}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDeleteModal