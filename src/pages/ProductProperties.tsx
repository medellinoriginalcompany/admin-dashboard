import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { ProductProperty } from "../types/product/Property";
import PropertiesCard from "../components/products/PropertiesCard";
import DefaultPage from "../components/page/DefaultPage";

const ProductProperties = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | Propriedades';

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
    <DefaultPage>
      <div className="grid grid-cols-2 gap-1 w-full">
        <PropertiesCard title='Tamanhos' property={sizes} loading={loading} />
        <PropertiesCard title='Categorias' property={categories} loading={loading} />
        <PropertiesCard title='Cores' property={colors} loading={loading} />
        <PropertiesCard title='Tipos' property={types} loading={loading} />
      </div>
    </DefaultPage>
  )
}

export default ProductProperties