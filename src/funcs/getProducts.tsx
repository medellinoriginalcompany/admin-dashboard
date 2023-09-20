import React, { useEffect, useState } from "react"

import editicon from '/icons/edit.svg';
import deleteicon from '/icons/trash.svg';
import moreicon from '/icons/more.svg';
import productplaceholder from '/images/product-placeholder.webp';
import Row from "../components/table/Row";
import { useApi } from "../hooks/useApi";
import { Product } from "../types/product/Product";

class Loop3 extends React.Component {


  renderRow() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const api = useApi();

    useEffect(() => {
      const getProducts = async () => {
        const response = await api.getProducts();

        if (response) {
          setProducts(response.products);
          console.log(response.products);
          setLoading(false);
        }
      }

      getProducts();
    }, [])
    return (
      <tr className="space-x-4 bg-primary">
        <Row content="Informações do Produto" price="00,00" image={productplaceholder} />
          <button className="bg-sky-200/80 p-3 rounded-full hover:bg-sky-300/80">
          <img src={editicon} alt='edit' className='w-4' draggable='false' />
        </button>
        <button className="bg-red-200/80 p-3 rounded-full hover:bg-red-300/80">
          <img src={deleteicon} alt='delete' className='w-4' draggable='false' />
        </button>
        <button className="p-3 rounded-full hover:bg-neutral-300">
          <img src={moreicon} alt='more' className='w-4 scale-150' draggable='false' />
        </button>
      </tr>
    )
  }
  render() {
    let rows = []
    for (let i = 0; i < 3; i++) {
      rows.push(i)
    }
    if (rows.length == 0) {
      return <p>Nenhum item</p>
    }
    return (
      <>
        {rows.map(this.renderRow)}
      </>

    )
  }
}

export default Loop3