import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import HeadRow from "../components/table/HeadRow";
import Row from "../components/table/Row";
import Category from "../components/table/Category";

import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import moreicon from '/icons/more.svg';
import productplaceholder from '/images/product-placeholder.webp';

const Products = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="z-50 w-full">
        <Header placeholder="Pesquisar produtos..." />
        <div className="p-8 space-y-5">
          <h2 className="text-xl font-semibold text-neutral-800">
            Gerenciar Produtos
          </h2>

          <table className="rounded border w-full">
            <thead className="">
              <tr className="bg-primary border-b text-sm text-neutral-500">
                <HeadRow content="Informações do Produto" />
                <HeadRow content="SKU" />
                <HeadRow content="Tags" />
                <HeadRow content="Estoque" />
                <HeadRow content="" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <Row content="Moletom 1" image={productplaceholder} price="299,99"/>
                <Row content="XXXXXXXX" />
                <td className="pl-4 pr-10 py-4 bg-primary">
                  <Category title='Categoria 1' />
                </td>
                <Row content="10" />
                <td className="space-x-4 px-4 bg-primary">
                  <button className="bg-sky-200 p-2 rounded-full">
                    <img src={editicon} alt='edit' className='w-4' draggable='false' />
                  </button>
                  <button className="bg-red-200 p-2 rounded-full">
                    <img src={deleteicon} alt='delete' className='w-4' draggable='false' />
                  </button>
                  <button className="p-2 rounded-full">
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