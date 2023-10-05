import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { ProductProperties } from "../types/product/Properties";

import PropertiesCard from "../components/products/PropertiesCard";

const ProductsProperties = () => {

  const api = useApi();

  const [categories, setCategories] = useState<ProductProperties[]>([]);
  const [types, setTypes] = useState<ProductProperties[]>([]);
  const [sizes, setSizes] = useState<ProductProperties[]>([]);
  const [colors, setColors] = useState<ProductProperties[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Promise.all([
          api.getCategories(),
          api.getTypes(),
          api.getSizes(),
          api.getColors(),
        ]);

        if (response) {
          setCategories(response[0].categories);
          setTypes(response[1].types);
          setSizes(response[2].sizes);
          setColors(response[3].colors);
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

export default ProductsProperties