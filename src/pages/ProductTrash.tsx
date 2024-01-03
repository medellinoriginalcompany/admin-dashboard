import { useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"
import { ProductTrash } from "../types/product/Trash"
import DefaultPage from "../components/page/DefaultPage"
import TrashCard from "../components/TrashCard"
import { Cloudinary } from "@cloudinary/url-gen/index"

const Trash = () => {
  document.title = 'Lixeira | ' + import.meta.env.VITE_APP_TITLE;

  const api = useApi();

  const [items, setItems] = useState<ProductTrash[]>([]);
  const [errMsg, setErrMsg] = useState<string>('');

  const getTrash = async () => {
    try {
      const response = await api.getTrash();
      if (response) {
        setItems(response.products);
      };

    } catch (error: any) {
      setErrMsg(error.response.data.message);
    }

  };

  useEffect(() => { getTrash() }, []);

  return (
    <DefaultPage>
      <>
        <div className="grid gap-2 md:grid-cols-1 xl:grid-cols-3">
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
              // Formatar horário para 12:00:00
              const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              const formattedDate = `${day}.${month}.${date.getFullYear()}`;

              return (
                <TrashCard key={item.ID}
                  id={item.ID}
                  name={item.Name}
                  price={item.Price}
                  banner={url}
                  date={formattedDate}
                  time={time}
                />
              )
            })
          }
        </div>
        {
          errMsg ? (
            <div className='sticky top-10 right-0 my-3'>
              <div className="bg-red-100 text-red-500 font-medium px-4 py-2 rounded-lg w-full">
                <span>{errMsg}</span>
              </div>
            </div>
          ) : null
        }
      </>
    </DefaultPage>
  )
}

export default Trash