import { useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"
import { ProductTrash } from "../types/product/Trash"
import DefaultPage from "../components/page/DefaultPage"
import TrashCard from "../components/TrashCard"
import { Cloudinary } from "@cloudinary/url-gen/index"

const Trash = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | Lixeira';

  const api = useApi();

  const [items, setItems] = useState<ProductTrash[]>([]);

  const getTrash = async () => {
    try {
      const response = await api.getTrash();
      if (response) {
        setItems(response.products);
      };

    } catch (error: any) {
      console.log(error);
      console.log("Ocorreu um erro ao obter os produtos");
    }

  };
  useEffect(() => {

    getTrash();
  }, []);

  return (
    <DefaultPage>
      <div className="grid gap-2 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4">
        {
          items.slice(0, 30).map((item) => {
            const cld = new Cloudinary({
              cloud: {
                cloudName: 'medellincompany',
              }
            });

            const url = cld.image(item.Banner).toURL();

            // Formatar data para 08.10.2023
            const date = new Date(item.DeletedAt);
            const day = date.getDate().toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário
            const formattedDate = `${day}.${month}.${date.getFullYear()}`;

            return (
              <TrashCard key={item.ID}
                name={item.Name}
                price={item.Price}
                banner={url}
                date={formattedDate}
              />
            )
          })
        }
      </div>
    </DefaultPage>
  )
}

export default Trash