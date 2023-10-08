import { useEffect, useRef, useState } from 'react';
import moreicon from '/icons/more.svg';

type Props = {
  banner: string,
  name: string,
  price: string,
  date: string,
}

const TrashCard = (props: Props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const trashCardRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: { target: any; }) => {
    if (trashCardRef.current && !trashCardRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  const handleEscape = (event: { keyCode: number; }) => {
    if (event.keyCode === 27) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    // Adiciona o ouvinte de eventos quando showOptions for verdadeiro
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove o ouvinte de eventos quando showOptions for falso
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup do useEffect
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className='bg-white/80 px-3 py-2.5 rounded flex justify-between relative' ref={trashCardRef}>
      <div className='flex'>
        <img src={props.banner} alt="" className="rounded w-16 h-16 object-cover" />
        <div className='ml-2 flex flex-col whitespace-nowrap overflow-hidden max-w-[230px]'>
          <span className="text font-semibold overflow-hidden text-ellipsis" title={props.name}>{props.name}</span>
          <span className="text-sm text-neutral-500 font-medium">R$ {props.price}</span>
          <span className="text-red-500 text-sm font-medium">Deletado em: {props.date}</span>
        </div>
      </div>
      <div className='p-1 rounded-full w-fit h-fit cursor-pointer hover:bg-neutral-200' onClick={() => setShowOptions(!showOptions)}>
        <img src={moreicon} alt="Mais opções" draggable='false' />
      </div>

      {
        showOptions && (
          <div className='absolute flex-col right-1 top-10 bg-accent/10 backdrop-blur rounded z-20'>
            <div className="flex flex-col w-fit self-end divide-y divide-blue-200">
              <button className="text-sm text-end text-blue-500 font-medium py-1 px-2 rounded-sm hover:bg-blue-500/80 hover:text-white">Restaurar</button>
              <button className="text-sm text-end text-red-500 font-medium py-1 px-2 rounded-sm hover:bg-red-500/80 hover:text-white">Deletar</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default TrashCard