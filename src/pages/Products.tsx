import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useEffect, useState } from "react";
import { Product } from "../types/product/Product";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

import externalicon from '/icons/external.svg';
import erricon from '/icons/danger-red-outline.svg';
import DefaultPage from "../components/page/DefaultPage";
import ProductCard from "../components/products/ProductCard";



const Products = () => {
  document.title = 'Produtos | ' + import.meta.env.VITE_APP_TITLE;

  const [products, setProducts] = useState<Product[]>([]);
  const [itemsLoaded, setItemsLoaded] = useState(30);

  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  const api = useApi();

  const getProducts = async () => {
    try {
      const response = await api.getProducts();

      if (response) {
        setTimeout(() => {
          setProducts(response.products);
          setLoading(false);
        }, 700);
      }
    } catch (error: any) {
      if (error.message === 'Network Error') {
        setErrMsg('Erro de conexão. Tente novamente mais tarde.');
        return;
      }
      setErrMsg(error.response.data.message);
    }
  }

  const loadMoreItems = () => {
    setItemsLoaded(itemsLoaded + 15);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <DefaultPage >
      <div>
        <div className="flex items-center justify-between mb-5">
          <Link to='cadastrar' className="bg-accent rounded-md w-fit py-2 font-semibold flex justify-between items-center hover:bg-neutral-700 dark:bg-accent-dark dark:hover:bg-neutral-200">
            <span className="mx-10 text-neutral-50 dark:text-neutral-950">
              Cadastrar Produto
            </span>
            <img src={externalicon} alt="" className="brightness-[6] -ml-5 mr-3 w-4 -scale-x-100 duration-75 dark:brightness-0 hover:" draggable='false' />
          </Link>
          {errMsg &&
            <div className='sticky top-10 right-0 my-3'>
              <div className="bg-red-100 text-red-500 font-medium px-4 py-2 rounded-lg w-full flex items-center gap-3">
                <span>{errMsg}</span>
                <img src={erricon} alt="" className="w-4" />
              </div>
            </div>
          }
          <span className="text-neutral-500 px-2 py-1 float-right">
            {products.length} produtos
          </span>
        </div>

        <div className="w-full">
          <div className="bg-accent text-sm text-white font-semibold rounded-lg grid grid-cols-7 py-3 mb-3 sticky top-3 z-40 shadow dark:bg-neutral-900 dark:text-neutral-500">
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

          <ul className="space-y-2 text-neutral-700">
            {loading ? (
              <div className="bg-blue-50 flex items-center gap-5 px-4 py-2 rounded">
                <span className="text-blue-500 font-medium">Carregando produtos...</span>
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : null}
            {products.length == 0 && !loading ? (
              <li>
                <div className="px-4 py-4">
                  <span className="bg-red-50 flex items-center justify-between gap-5 px-4 py-2 rounded">
                    <p className="text-red-500 font-medium">Nenhum produto foi encontrado.</p>
                    <img src={erricon} alt="Erro" className="w-4" />
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
                  <ProductCard key={product.ID}
                    imageURL={url}
                    product={product}
                  />
                )
              })
            )}
          </ul>

        </div>
        {products.length <= itemsLoaded ? null : (
          <div className="w-fit mx-auto my-5">
            <button className="bg-accent text-white border font-medium px-5 py-2 rounded dark:bg-neutral-900 dark:border-neutral-800" onClick={loadMoreItems}>
              Carregar Mais
            </button>
          </div>
        )}
      </div>
    </DefaultPage>
  )
}

export default Products