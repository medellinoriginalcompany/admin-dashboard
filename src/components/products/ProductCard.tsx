import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";
import { CloudinaryImage } from "@cloudinary/url-gen/index";
import { Product } from "../../types/product/Product";
import { useState } from "react";

import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import Confirmation from "../Confirmation";
import tickicon from '/icons/tick-circle-green.svg';
import closeicon from '/icons/close-circle-red.svg';
import { useApi } from "../../hooks/useApi";

type Props = {
  product: Product,
  imageURL: CloudinaryImage,
}

const ProductCard = (props: Props) => {

  const api = useApi();

  const [showImage, setShowImage] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");


  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${name}"?`)) {
      const response = await api.deleteProduct(id);
      if (response) {
        setConfirmationMessage(response.message);
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 5000);

      } else {
        console.log("Ocorreu um erro ao excluir o produto");
        setConfirmationMessage("Ocorreu um erro ao excluir o produto");
        setShowConfirmation(true);
      }


    }
  }



  return (
    <>
      <li className="grid grid-cols-7 items-center border rounded-md bg-neutral-50 hover:bg-neutral-100">
        <div className='px-4 flex gap-4 col-span-2 rounded-l-md p-2'>
          <div className="cursor-pointer hover:brightness-[.7]" onClick={() => setShowImage(true)}>
            <AdvancedImage cldImg={props.imageURL} className="w-14 min-w-[56px] h-14 rounded-lg object-cover" alt={'Imagem ' + props.product.Name} loading="lazy" />
          </div>
          <Link to={'/produtos/editar?id=' + props.product.ID} className='flex flex-col h-fit my-auto'>
            <span className='font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis md:w-44 2xl:w-80' title={props.product.Name}>
              {props.product.Name}
            </span>
            <span className="text-xs font-semibold text-neutral-400">
              R$ {props.product.Price}
            </span>
          </Link>
        </div>
        <div className='p-2'>
          <div className="py-4 px-4 overflow-x-hidden whitespace-nowrap text-ellipsis w-46">
            <span title={props.product.SKU}>
              {props.product.SKU}
            </span>
          </div>
        </div>
        <div className='p-2'>
          <div className="py-4 2xl:px-4">
            <span className="overflow-hidden whitespace-nowrap text-ellipsis" title={props.product.Category.Name}>
              {props.product.Category.Name}
            </span>
          </div>
        </div>
        <div className='p-2'>
          <div className="py-4 px-4">
            <span>
              {props.product.Stock}
            </span>
          </div>
        </div>
        <div className='p-2'>
          <div className="py-4 px-4">
            {props.product.Active ? (
              <img src={tickicon} alt="" className="bg-green-100 rounded-full" draggable="false" />
            ) : (
              <img src={closeicon} alt="" className="bg-red-100 rounded-full" draggable="false" />
            )}
          </div>
        </div>
        <div className=" relative  rounded-r">
          <div className="py-4 space-x-4 w-fit mx-auto flex">
            <Link to={'/produtos/editar?id=' + props.product.ID} className="bg-sky-200/80 p-3 rounded-full hover:bg-sky-300/80">
              <div>
                <img src={editicon} alt='edit' className='min-w-[16px] w-4' draggable='false' />
              </div>
            </Link>
            <div onClick={async () => { await handleDelete(props.product.ID, props.product.Name); }} className="bg-red-200/80 p-3 rounded-full cursor-pointer hover:bg-red-300/80">
              <img src={deleteicon} alt='delete' className='min-w-[16px] w-4' draggable='false' />
            </div>
          </div>
        </div>
      </li>
      {
        showImage && (
          <div className='fixed -top-1 left-0 w-full h-full bg-neutral-800/20 z-50' onClick={() => setShowImage(false)}>
            <div className='flex flex-col justify-center h-full'>
              <div className="max-w-4xl mx-auto">
                <AdvancedImage cldImg={props.imageURL} alt="" />
              </div>
            </div>
          </div>
        )
      }
      <>
        {
          showConfirmation && (
            <Confirmation content={confirmationMessage} />
          )
        }

      </>
    </>

  )
}

export default ProductCard