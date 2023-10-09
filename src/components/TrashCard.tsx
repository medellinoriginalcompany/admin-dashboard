import { useEffect, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { motion } from 'framer-motion';

import moreicon from '/icons/more.svg';
import dangericon from '/icons/danger.svg';

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
    try {
      setLoading(true);
      const response = await api.restoreProduct(id);

      if (response) {
        setLoading(false);
        setConfirmationMessage(response.message);

        setTimeout(() => {
          window.location.reload();
        }, 1100);
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
    try {
      setLoading(true);
      const response = await api.permaDeleteProduct(id);

      if (response) {
        setLoading(false);
        setConfirmationMessage(response.message);

        setTimeout(() => {
          window.location.reload();
        }, 900);
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
      <div className='bg-white/80 px-3 py-2.5 rounded flex justify-between relative' ref={trashCardRef}>
        <div className='flex'>
          <img src={props.banner} alt="" className="rounded w-16 h-16 object-cover" />
          <div className='ml-2 flex flex-col whitespace-nowrap overflow-hidden max-w-[230px]'>
            <span className="text font-semibold overflow-hidden text-ellipsis" title={props.name}>{props.name}</span>
            <span className="text-sm text-neutral-500 font-medium">R$ {props.price}</span>
            <span className="text-red-500 text-sm font-medium mt-2">Deletado em: {props.date} às {props.time}</span>
          </div>
        </div>
        <div className='p-1 rounded-full w-fit h-fit cursor-pointer hover:bg-neutral-200' onClick={() => setShowOptions(!showOptions)}>
          <img src={moreicon} alt="Mais opções" draggable='false' />
        </div>

        {
          showOptions && (
            <div className='absolute flex-col right-1 top-10 bg-accent/10 backdrop-blur rounded z-20'>
              <div className="flex flex-col w-fit self-end divide-y divide-blue-200">
                <button onClick={() => setShowConfirmationRestore(true)}
                  className="text-sm text-end text-blue-500 font-medium py-1 px-2 rounded-sm hover:bg-blue-500/80 hover:text-white">Restaurar</button>
                <button onClick={() => setShowConfirmationDelete(true)}
                  className="text-sm text-end text-red-500 font-medium py-1 px-2 rounded-sm hover:bg-red-500/80 hover:text-white">Deletar</button>
              </div>
            </div>
          )
        }
      </div>
      {
        showConfirmationDelete && (
          <div className='absolute top-0 left-0 w-full h-full bg-neutral-800/20 z-50'>
            <div className='flex flex-col justify-center h-full'>
              <div className='bg-white max-w-4xl mx-auto rounded' ref={confirmationDeleteRef}>
                <div className="flex flex-col px-9 py-9 space-y-10">
                  <div className=''>
                    <h2 className='text-2xl font-semibold flex items-center gap-2'>
                      <img src={dangericon} alt="Perigo!" />
                      Cuidado, esta ação é irreversível!
                    </h2>
                    <h3 className='text-xl font-medium'>
                      Tem certeza que deseja deletar este produto?
                    </h3>

                    <p className='mx-auto w-fit my-3 bg-neutral-200 px-2 rounded whitespace-pre'>{props.name}</p>
                  </div>

                  <div className='flex flex-col space-y-2'>
                    {
                      loading && (
                        <div className='bg-blue-100 px-4 py-2 rounded flex justify-between items-center'>
                          <p className='text-blue-500 font-medium text-center'>
                            Carregando...
                          </p>
                          <div className='w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin'></div>
                        </div>
                      )
                    }
                    {
                      confirmationMessage && (
                        <motion.div className='bg-green-100 px-4 py-2 rounded'
                          initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
                          animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
                          transition={{
                            duration: 1,
                            type: 'spring',
                          }}
                        >
                          <p className='text-green-500 font-medium text-center'>
                            {confirmationMessage}
                          </p>
                        </motion.div>
                      )
                    }
                    {
                      errMsg && (
                        <div className='bg-red-100 px-4 py-2 rounded flex justify-between items-center'>
                          <p className='text-red-500 font-medium text-center'>
                            {errMsg}
                          </p>
                        </div>
                      )
                    }
                    <button onClick={() => setShowConfirmationDelete(false) }
                      className='bg-accent text-white font-medium px-4 py-2 rounded hover:bg-blue-700' >Não! Me leve de volta</button>
                    <button className='font-semibold text-red-500 w-fit mx-auto' onClick={() => handleDelete(props.id)}>Deletar permanentemente <span className='px-1'>:&#40;</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        showConfirmationRestore && (
          <div className='absolute top-0 left-0 w-full h-full bg-neutral-800/20 z-50'>
            <div className='flex flex-col justify-center h-full'>
              <div className='bg-white max-w-4xl mx-auto rounded' ref={confirmationRestoreRef}>
                <div className="flex flex-col px-9 py-9 space-y-10">
                  <div className=''>
                    <h3 className='text-xl font-medium'>
                      Tem certeza que deseja restaurar este produto?
                    </h3>

                    <p className='mx-auto w-fit my-3 bg-neutral-200 px-2 rounded whitespace-pre'>{props.name}</p>
                  </div>

                  <div className='flex flex-col space-y-2'>
                    {
                      loading && (
                        <div className='bg-blue-100 px-4 py-2 rounded flex justify-between items-center'>
                          <p className='text-blue-500 font-medium text-center'>
                            Carregando...
                          </p>
                          <div className='w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin'></div>
                        </div>
                      )
                    }
                    {
                      confirmationMessage && (
                        <motion.div className='bg-green-100 px-4 py-2 rounded'
                          initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
                          animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
                          transition={{
                            duration: 1,
                            type: 'spring',
                          }}
                        >
                          <p className='text-green-500 font-medium text-center'>
                            {confirmationMessage}
                          </p>
                        </motion.div>
                      )
                    }
                    {
                      errMsg && (
                        <div className='bg-red-100 px-4 py-2 rounded flex justify-between items-center'>
                          <p className='text-red-500 font-medium text-center'>
                            {errMsg}
                          </p>
                        </div>
                      )
                    }
                    <button onClick={() => setShowConfirmationRestore(false) }
                      className='bg-accent text-white font-medium px-4 py-2 rounded hover:bg-blue-700' >Não! Me leve de volta</button>
                    <button className='font-semibold text-red-500 w-fit mx-auto' onClick={() => handleRestore(props.id)}>Restaurar produto<span className='px-1'>:&#41;</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>

  )
}

export default TrashCard