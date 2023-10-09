import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useEffect, useState } from "react";
import { Product } from "../types/product/Product";

import addicon from '/icons/add-square.svg';
import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import moreicon from '/icons/more.svg';
import Confirmation from "../components/Confirmation";
import erricon from '/icons/danger-red.svg';
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import DefaultPage from "../components/page/DefaultPage";



const Products = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | Produtos'


  const [products, setProducts] = useState<Product[]>([]);
  const [itemsLoaded, setItemsLoaded] = useState(30);
  const [loading, setLoading] = useState(true);
  const [retryTimeout, setRetryTimeout] = useState<NodeJS.Timeout | null>(null); // Estado para controlar o intervalo de retentativas de reqTimeout
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const api = useApi();

  const getProducts = async () => {
    try {
      const response = await api.getProducts();

      if (response) {
        setProducts(response.products);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      console.log("Ocorreu um erro ao obter os produtos");
      setConfirmationMessage("Ocorreu um erro ao obter os produtos");
      setShowConfirmation(true);
      // Tente novamente em 5 segundos
      const timeout = setTimeout(() => {
        getProducts();
      }, 5000);
      setRetryTimeout(timeout);
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${name}"?`)) {
      const response = await api.deleteProduct(id);
      if (response) {
        setConfirmationMessage(response.message);
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 5000);
        // Reload products
        getProducts();

      } else {
        console.log("Ocorreu um erro ao excluir o produto");
        setConfirmationMessage("Ocorreu um erro ao excluir o produto");
        setShowConfirmation(true);
      }


    }
  }

  const loadMoreItems = () => {
    setItemsLoaded(itemsLoaded + 15);
  };


  useEffect(() => {
    getProducts();

    // Certifique-se de limpar o intervalo ao desmontar o componente
    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, []);

  return (
    <DefaultPage >
      <div className="p-8 space-y-5">
        <div className="flex items-center justify-between my-5">
          <Link to='cadastrar' className="bg-accent text-primary rounded-lg w-fit px-8 py-2 font-semibold flex items-center hover:bg-accent/80">
            <img src={addicon} alt='add' className='mr-2 brightness-[6]' draggable='false' />
            Cadastrar Produto
          </Link>
          <span className="text-neutral-500 px-2 py-1 float-right">
            {products.length} produtos
          </span>

        </div>

        <div className="w-full">
          <div className="bg-accent text-sm text-white font-semibold rounded-t-lg rounded-b grid grid-cols-7 py-3 mb-1">
            <h3 className="px-5 col-span-2">
              Informações do Produto
            </h3>
            <h3 className="px-5">
              SKU
            </h3>
            <h3 className="px-5">
              Categorias
            </h3>
            <h3 className="px-5">
              Estoque
            </h3>
            <h3 className="px-5">
              Ativo
            </h3>
          </div>

          <ul className="space-y-1 text-neutral-700">
            {
              loading ? (
                <div className="bg-green-100 w-fit my-2 px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg shadow-green-500/20">
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-green-500 font-medium">Carregando produtos...</span>
                </div>
              ) : null
            }
            {
              products.length == 0 ? (
                <li>
                  <div className="px-4 py-4">
                    <span className="font-medium text-red-500 bg-red-200/70 border border-red-500 rounded-lg px-3 py-1 w-fit flex gap-2 items-center">
                      <img src={erricon} alt="Erro" />
                      Nenhum produto foi encontrado.
                    </span>
                  </div>
                </li>
              ) : (
                products.slice(0, itemsLoaded).map((product) => {
                  const cld = new Cloudinary({
                    cloud: {
                      cloudName: 'medellincompany',
                    }
                  });

                  const url = cld.image(product.Banner).format(auto());

                  return (
                    <li key={product.ID} className="grid grid-cols-7 items-center">
                      <div className='px-4 flex gap-4 col-span-2 bg-white/80 rounded-l p-2'>
                        <AdvancedImage cldImg={url} className="w-14 min-w-[56px] h-14 rounded-lg object-cover" alt={'Imagem ' + product.Name} loading="lazy" />
                        <Link to={'/produtos/editar?id=' + product.ID} className='flex flex-col h-fit my-auto'>
                          <span className='font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis md:w-44 2xl:w-80' title={product.Name}>
                            {product.Name}
                          </span>
                          <span className="text-xs font-semibold text-neutral-400">
                            R$ {product.Price}
                          </span>
                        </Link>
                      </div>
                      <div className='bg-white/80 p-2'>
                        <div className="py-4 px-4">
                          <span>
                            {product.SKU}
                          </span>
                        </div>
                      </div>
                      <div className='bg-white/80 p-2'>
                        <div className="py-4 2xl:px-4">
                          <span>
                            {product.Category.Name}
                          </span>
                        </div>
                      </div>
                      <div className='bg-white/80 p-2'>
                        <div className="py-4 px-4">
                          <span>
                            {product.Stock}
                          </span>
                        </div>
                      </div>
                      <div className='bg-white/80 p-2'>
                        <div className="py-4 px-4">
                          <form className="h-fit">
                            <label className="relative cursor-pointer">
                              <input type="checkbox" name="active" id="active" className="sr-only peer" value='' />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="bg-white/80 relative  rounded-r">
                        <div className="py-4 space-x-4 w-fit mx-auto flex">
                          <Link to={'/produtos/editar?id=' + product.ID} className="bg-sky-200/80 p-3 rounded-full hover:bg-sky-300/80">
                            <div>
                              <img src={editicon} alt='edit' className='w-4' draggable='false' />
                            </div>
                          </Link>
                          <div onClick={async () => { await handleDelete(product.ID, product.Name); }} className="bg-red-200/80 p-3 rounded-full cursor-pointer hover:bg-red-300/80">
                            <img src={deleteicon} alt='delete' className='w-4' draggable='false' />
                          </div>
                          <div className="p-3 rounded-full hover:bg-neutral-300">
                            <img src={moreicon} alt='more' className='w-4 scale-150' draggable='false' />
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              )
            }
          </ul>

        </div>
        {
          products.length <= itemsLoaded ? null : (
            <div className="w-fit">
              <button className="bg-accent text-white font-medium px-5 py-2 rounded-lg" onClick={loadMoreItems}>
                Carregar Mais
              </button>
            </div>
          )
        }

      </div>
      <>
        {
          showConfirmation && (
            <Confirmation content={confirmationMessage} />
          )
        }
      </>
    </DefaultPage>
  )
}

export default Products