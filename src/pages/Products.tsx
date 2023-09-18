import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import HeadRow from "../components/table/HeadRow";
import Row from "../components/table/Row";
import Category from "../components/table/Category";

import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import moreicon from '/icons/more.svg';
import productplaceholder from '/images/product-placeholder.webp';
import addicon from '/icons/add-square.svg';
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="z-50 w-full bg-secondary shadow-inner rounded-2xl">
        <Header placeholder="Pesquisar produtos..." />
        <div className="p-8 space-y-8">
          <h2 className="text-2xl font-light text-neutral-800">
            Gerenciar Produtos
          </h2>

          <Link to='cadastrar' className="bg-accent text-primary rounded-lg w-fit px-8 py-2 font-semibold flex items-center shadow-lg transition-all hover:scale-105 hover:bg-neutral-900">
            <img src={addicon} alt='add' className='mr-2 brightness-[6]' draggable='false' />
            Adicionar Produto
          </Link>

          <table className="w-full shadow-lg">
            <thead className="">
              <tr className="bg-primary border-b text-sm text-neutral-500">
                <HeadRow content="Informações do Produto" />
                <HeadRow content="SKU" />
                <HeadRow content="Categorias" />
                <HeadRow content="Estoque" />
                <HeadRow content=""/>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <Row content="Moletom 1" image={productplaceholder} price="299,99"/>
                <Row content="XXXXXXXX" />
                <td className="pl-4 pr-10 py-4 bg-primary">
                  <Category title='Categoria 1' />
                </td>
                <Row content="10" />
                <td className="space-x-4 bg-primary">
                  <button className="bg-sky-200/80 p-3 rounded-full hover:bg-sky-300/80">
                    <img src={editicon} alt='edit' className='w-4' draggable='false' />
                  </button>
                  <button className="bg-red-200/80 p-3 rounded-full hover:bg-red-300/80">
                    <img src={deleteicon} alt='delete' className='w-4' draggable='false' />
                  </button>
                  <button className="p-3 rounded-full hover:bg-neutral-300">
                    <img src={moreicon} alt='more' className='w-4 scale-150' draggable='false' />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Products