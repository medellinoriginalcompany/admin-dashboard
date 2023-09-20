import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import HeadRow from "../components/table/HeadRow";
import Row from "../components/table/Row";


import addicon from '/icons/add-square.svg';
import { Link } from "react-router-dom";
import Loop3 from "../funcs/getProducts";

const Products = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | Produtos'


  

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full shadow-inner-lg bg-secondary rounded-2xl">
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
                <HeadRow content="" />
              </tr>
            </thead>
            <tbody className="divide-y">
              <Loop3 />
                
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Products