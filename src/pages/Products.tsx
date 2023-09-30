import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import HeadRow from "../components/table/HeadRow";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useEffect, useState } from "react";
import { Product } from "../types/product/Product";

import addicon from '/icons/add-square.svg';
import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import moreicon from '/icons/more.svg';
import Confirmation from "../components/Confirmation";
import erricon from '/icons/danger.svg';



const Products = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | Produtos'


  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    getProducts();

    // Certifique-se de limpar o intervalo ao desmontar o componente
    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, []);



  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
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

  return (
    <div className="flex">

      <Sidebar />
      <div className="w-full shadow-inner-lg bg-secondary rounded-l-2xl">
        <Header placeholder="Pesquisar produtos..." />
        <div className="p-8 space-y-5">
          <h2 className="text-2xl font-light text-neutral-800">
            Gerenciar Produtos
          </h2>


          <div>
            <div className="flex items-center justify-between my-5">
              <Link to='cadastrar' className="bg-accent text-primary rounded-lg w-fit px-8 py-2 font-semibold flex items-center shadow transition-all hover:scale-105 hover:bg-neutral-900">
                <img src={addicon} alt='add' className='mr-2 brightness-[6]' draggable='false' />
                Adicionar Produto
              </Link>
              <span className="text-neutral-500 px-2 py-1 float-right">
                {products.length} produtos
              </span>

            </div>

            <table className="w-full shadow-lg table-fixed">
              <thead className="">
                <tr className="bg-primary border-b text-sm text-neutral-500">
                  {
                    loading ? (
                      <th className="p-4 flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Carregando produtos...</span>
                      </th>
                    ) : (
                      <HeadRow content="Informações do Produto" />
                    )
                  }
                  <HeadRow content="SKU" />
                  <HeadRow content="Categorias" />
                  <HeadRow content="Estoque" />
                  <HeadRow content="" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {
                  products.length == 0 ? (
                    <td className="px-4 py-4">
                      <span className="font-medium text-red-500 bg-red-200/70 border border-red-500 rounded-lg px-3 py-1 w-fit flex gap-2 items-center">
                        <img src={erricon} alt="Erro" />
                        Nenhum produto foi encontrado.
                      </span>
                    </td>
                  ) : (
                    products.slice(0, 30).map((product) => {
                      return (
                        <tr key={product.ID}>
                          <td className='pl-4 py-4 text-left bg-primary flex gap-4'>
                            <img src={'/images/' + product.Banner} className="w-14 h-14 rounded-lg object-cover" />
                            <div className='flex flex-col h-fit'>
                              <span className='font-semibold whitespace-nowrap w-60 overflow-hidden overflow-ellipsis'>
                                {product.Name}
                              </span>
                              <span className="text-xs font-semibold text-neutral-400">
                                R$ {product.Price}
                              </span>
                            </div>
                          </td>
                          <td className='pl-4 py-4 text-left bg-primary'>
                            <span>
                              {product.SKU}
                            </span>
                          </td>
                          <td className='pl-4 py-4 text-left bg-primary'>
                            <span>
                              {product.Category.Name}
                            </span>
                          </td>
                          <td className='pl-4 py-4 text-left bg-primary'>
                            <span>
                              {product.Stock}
                            </span>
                          </td>
                          <td className="bg-primary relative">
                            <div className="space-x-4 w-fit mx-auto">
                              <button className="bg-sky-200/80 p-3 rounded-full hover:bg-sky-300/80">
                                <img src={editicon} alt='edit' className='w-4' draggable='false' />
                              </button>
                              <button onClick={async () => { await handleDelete(product.ID); }} className="bg-red-200/80 p-3 rounded-full hover:bg-red-300/80">
                                <img src={deleteicon} alt='delete' className='w-4' draggable='false' />
                              </button>
                              <button className="p-3 rounded-full hover:bg-neutral-300">
                                <img src={moreicon} alt='more' className='w-4 scale-150' draggable='false' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        {
          showConfirmation && (
            <Confirmation content={confirmationMessage} />
          )
        }
      </div>
    </div>
  )
}

export default Products