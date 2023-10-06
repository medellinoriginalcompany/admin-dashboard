import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { ProductProperty } from "../types/product/Property";


import PropertiesCard from "../components/products/PropertiesCard";

const ProductProperties = () => {

  const api = useApi();

  const [categories, setCategories] = useState<ProductProperty[]>([]);
  const [types, setTypes] = useState<ProductProperty[]>([]);
  const [sizes, setSizes] = useState<ProductProperty[]>([]);
  const [colors, setColors] = useState<ProductProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.getProductProperties();

        if (response) {
          setCategories(response.categories);
          setTypes(response.types);
          setSizes(response.sizes);
          setColors(response.colors);
          setLoading(false);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-full space-y-8 overflow-y-scroll lg:px-5 2xl:px-14">
        <Header />
        <div className="grid grid-cols-2 gap-5 pb-20 w-full h-96">
          <PropertiesCard title='Tamanhos' property={sizes} loading={loading} />
          <PropertiesCard title='Categorias' property={categories} loading={loading} />
          <PropertiesCard title='Cores' property={colors} loading={loading} />
          <PropertiesCard title='Tipos' property={types} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default ProductProperties