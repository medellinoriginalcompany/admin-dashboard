import { useEffect, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { motion } from 'framer-motion';

import moreicon from '/icons/more.svg';
import exclamationicon from '/icons/exclamation.svg';
import closeicon from '/icons/add.svg';

type Props = {
  id: number,
  banner: string,
  name: string,
  price: string,
  date: string,
  time: string,
}

const TrashCard = (props: Props) => {
  const api = useApi();

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showConfirmationRestore, setShowConfirmationRestore] = useState<boolean>(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const trashCardRef = useRef<HTMLDivElement>(null);
  const confirmationDeleteRef = useRef<HTMLDivElement>(null);
  const confirmationRestoreRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setShowOptions(false);
    setShowConfirmationDelete(false);
    setShowConfirmationRestore(false);
  };

  const handleClickOutside = (event: { target: any; }) => {
    if (trashCardRef.current && !trashCardRef.current.contains(event.target)) {
      setShowOptions(false);
    }

    if (confirmationDeleteRef.current && !confirmationDeleteRef.current.contains(event.target)) {
      setShowConfirmationDelete(false);
    }

    if (confirmationRestoreRef.current && !confirmationRestoreRef.current.contains(event.target)) {
      setShowConfirmationRestore(false);
    }
  };

  const handleEscape = (event: { keyCode: number; }) => {
    if (event.keyCode === 27) {
      setShowOptions(false);
      setShowConfirmationDelete(false);
      setShowConfirmationRestore(false);
    }
  };

  const handleRestore = async (id: number) => {
    setErrMsg('');
    setConfirmationMessage('');

    try {
      setLoading(true);
      const response = await api.restoreProduct(id);

      if (response) {
        setTimeout(() => {
          setLoading(false);
          setConfirmationMessage(response.message);
        }, 1300);

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error: any) {
      setLoading(false);
      setConfirmationMessage('');
      setErrMsg(error.response.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }

  const handleDelete = async (id: number) => {
    setErrMsg('');
    setConfirmationMessage('');

    try {
      setLoading(true);
      const response = await api.permaDeleteProduct(id);

      if (response) {
        setTimeout(() => {
          setLoading(false);
          setConfirmationMessage(response.message);
        }, 1300);

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error: any) {
      setLoading(false);
      setConfirmationMessage('');
      setErrMsg(error.response.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    // Adiciona o ouvinte de eventos quando showOptions for verdadeiro
    if (showOptions || showConfirmationDelete || showConfirmationRestore) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove o ouvinte de eventos quando showOptions for falso
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup do useEffect
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions, showConfirmationDelete, showConfirmationRestore]);

  return (
    <>
      <div className='bg-neutral-50 border border-neutral-300 px-3 py-2.5 rounded flex justify-between relative dark:bg-neutral-900 dark:border-neutral-800' ref={trashCardRef}>
        <div className='flex'>
          <img src={props.banner} alt="" className="rounded w-16 h-16 object-cover" />
          <div className='ml-2 flex flex-col whitespace-nowrap overflow-hidden max-w-[230px]'>
            <span className="text font-semibold overflow-hidden text-ellipsis dark:text-neutral-400" title={props.name}>
              {props.name}
            </span>
            <span className="text-sm text-neutral-500 font-medium dark:text-neutral-600">R$ {props.price}</span>
            <span className="text-red-500 text-sm font-medium mt-2">Deletado em: {props.date} às {props.time}</span>
          </div>
        </div>
        <div className='p-1 rounded-full min-w-[30px] w-fit h-fit cursor-pointer hover:bg-neutral-200' onClick={() => setShowOptions(!showOptions)}>
          <img src={moreicon} alt="Mais opções" draggable='false' />
        </div>

        {showOptions && (
          <div className='absolute flex-col right-1 top-10 p-4 bg-white border border-neutral-300 w-64 rounded z-20 dark:bg-neutral-900 dark:border-neutral-800'>
            <div className="flex flex-col gap-2">
              <button onClick={() => setShowConfirmationRestore(true)}
                className="text-sm text-center text-blue-500 font-medium py-1 px-2 rounded bg-blue-50 hover:bg-blue-100
                dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400">
                Restaurar
              </button>
              <button onClick={() => setShowConfirmationDelete(true)}
                className="text-sm text-center text-red-500 font-medium py-1.5 rounded flex items-center gap-2 justify-center bg-red-50 hover:bg-red-100
                dark:bg-red-500 dark:text-white dark:hover:bg-red-400">
                Deletar permanentemente <img src="/icons/danger-red-outline.svg" alt="" className='w-4 dark:brightness-[6]' />
              </button>
            </div>
          </div>
        )}
      </div>
      {showConfirmationRestore && (
        <div className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-10 z-50'>
          <div className='bg-white border border-neutral-300 w-[700px] h-[400px] p-9 mx-auto rounded relative dark:bg-neutral-900 dark:border-neutral-800' ref={confirmationRestoreRef}>
            <div className="flex flex-col">
              <div className='flex items-center justify-between'>
                <h3 className="font-medium flex items-center">
                  <img src={exclamationicon} alt="" className="w-7" />
                  <span className='dark:text-neutral-400'>
                    Tem certeza que deseja RESTAURAR este produto?
                  </span>
                </h3>

                <button className='cursor-pointer rounded hover:bg-red-400 group' onClick={close}>
                  <img src={closeicon} alt="" className='rotate-45 group-hover:brightness-[6]' />
                </button>
              </div>
              <h4 className='px-7 mb-6 font-medium text-sm text-neutral-500 dark:text-neutral-600'>
                IMPORTANTE: Ao clicar em RESTAURAR o produto voltará como inativo e terá de ser reativado manualmente.
              </h4>
              <p className='mx-auto w-fit bg-neutral-50 border border-neutral-300 text-neutral-500 shadow-sm px-4 rounded whitespace-wrap dark:bg-neutral-800 dark:border-neutral-700'>
                {props.name}
              </p>

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
                    Restaurando...
                  </p>
                  <div className='w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin'></div>
                </motion.div>
              )}
              {confirmationMessage && (
                <motion.div className='bg-green-50 flex items-center justify-end gap-5 absolute right-0 bottom-14 px-4 py-2 m-4 rounded'
                  initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
                  animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
                  transition={{
                    duration: 1,
                    type: 'spring',
                  }}
                >
                  <p className='text-green-500 font-medium text-center flex items-center gap-2'>
                    {confirmationMessage} <img src="/icons/check.svg" alt="" className='w-5' />
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
            </div>

            <div className="flex items-center justify-end absolute right-0 bottom-0 p-4">
              <button className="mx-5 my-2 dark:text-neutral-400" onClick={close}>
                Cancelar
              </button>
              <button
                className="rounded px-5 py-1.5 text-blue-500 bg-blue-50 group hover:text-white hover:bg-blue-500 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400" onClick={() => handleRestore(props.id)}>
                Restaurar produto
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmationDelete && (
        <div className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-10 z-50'>
          <div className='bg-white border border-neutral-300 w-[700px] h-[400px] p-9 mx-auto rounded relative
          dark:bg-neutral-900 dark:border-neutral-800' ref={confirmationDeleteRef}>
            <div className="flex flex-col">
              <div className='flex items-center justify-between'>
                <h3 className="font-medium flex items-center">
                  <img src={exclamationicon} alt="" className="w-7" />
                  <span className='text-neutral-400'>
                    Tem certeza que deseja DELETAR PERMANENTEMENTE este produto?
                  </span>
                </h3>

                <button className='cursor-pointer rounded hover:bg-red-400 group' onClick={close}>
                  <img src={closeicon} alt="" className='rotate-45 group-hover:brightness-[6]' />
                </button>
              </div>
              <h4 className='px-7 mb-6 font-medium text-sm text-neutral-500 dark:text-neutral-600'>
                IMPORTANTE: Esta ação é IRREVERSÍVEL e não será mais possível recuperar os dados deste produto.
              </h4>
              <p className='mx-auto w-fit bg-neutral-50 border border-neutral-300 text-neutral-500 shadow-sm px-4 rounded whitespace-wrap dark:bg-neutral-800 dark:border-neutral-700'>
                {props.name}
              </p>

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
              {confirmationMessage && (
                <motion.div className='bg-green-50 flex items-center justify-end gap-5 absolute right-0 bottom-14 px-4 py-2 m-4 rounded'
                  initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
                  animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
                  transition={{
                    duration: 1,
                    type: 'spring',
                  }}
                >
                  <p className='text-green-500 font-medium text-center flex items-center gap-2'>
                    {confirmationMessage} <img src="/icons/check.svg" alt="" className='w-5' />
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
            </div>

            <div className="flex items-center justify-end absolute right-0 bottom-0 p-4">
              <button className="mx-5 my-2 dark:text-neutral-400" onClick={close}>
                Cancelar
              </button>
              <button
                className="flex items-center gap-3 rounded px-5 py-1.5 text-red-500 bg-red-50 group hover:text-white hover:bg-red-500 dark:bg-red-500 dark:text-white dark:hover:bg-red-400" onClick={() => handleDelete(props.id)}>
                Deletar permanentemente <img src="/icons/danger-red-outline.svg" alt="" className='group-hover:brightness-[6] w-4 dark:brightness-[6]' />
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default TrashCard