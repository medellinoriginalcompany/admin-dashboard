import { Link } from "react-router-dom";
import ProductInput from "../components/form/ProductInput"
import { ChangeEvent, useState, useEffect } from "react"
import { useApi } from "../hooks/useApi";
import { ProductCategory } from "../types/Category";
import { ProductType } from "../types/Type";
import erricon from '/icons/danger.svg';
import { motion } from "framer-motion";

const AddProduct = () => {

  const api = useApi();

  const [name, setName] = useState<string>('');
  // * const [sku, setSku] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [size, setSize] = useState<string>('');

  const [errMsg, setErrMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [types, setTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Promise.all([
          api.getCategories(),
          api.getTypes(),
        ]);

        if (response) {
          setCategories(response[0].categories);
          setTypes(response[1].types);
          setLoading(false);
        }
      } catch (error: any) {
        setErrMsg(error.response.data.message)
        console.log(error);
      }
    };

    getData();
  }, [])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await api.addProduct(name, description, price, size, category);
      if (response) {
        setSuccessMsg('Produto adicionado com sucesso! Redirecionando para a página de produtos...');
      }
    } catch (error: any) {
      setErrMsg(error.response.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
      <Link to='/produtos' className="absolute top-8 left-8">
        Voltar
      </Link>

      <div>
        {
          errMsg ?
            <motion.div className='flex justify-between items-center bg-red-300/30 p-3 rounded-lg border border-red-400 mb-3 font-semibold text-red-500'
              initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
              animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
              transition={{
                duration: 1,
                type: 'spring',
              }}
            >
              <p>
                {errMsg}
              </p>

              <img src={erricon} />
            </motion.div>
            : ''
        }
        {
          successMsg ?
            <motion.div className='flex gap-3 justify-between items-center bg-green-300/30 p-3 rounded-lg border border-green-400 mb-3 font-semibold text-green-500'
              initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
              animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
              transition={{
                duration: 1,
                type: 'spring',
              }}
            >
              <p>
                {successMsg}
              </p>
              <div className="w-4 h-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin"></div>
            </motion.div>
            : ''
        }
        <form onSubmit={handleSubmit}>
          <ProductInput
            label="Nome"
            name="name"
            type="text"
            value={name}
            handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
            maxLength={50}
            placeholder="Digite o nome do produto"
            autoFocus
          />
          <ProductInput
            label="Descrição"
            name="description"
            type="text"
            value={description}
            handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setDescription(e.target.value) }}
            maxLength={50}
            placeholder="Digite a descrição do produto"
          />
          <div className="flex">
            <ProductInput
              label="Preço"
              name="price"
              type="tel"
              value={price}
              handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setPrice(e.target.value) }}
              maxLength={6}
              placeholder="199,99"
            />
          </div>

          <div className="flex">
            <div>
              <label htmlFor="size">
                Tamanho
                <select
                  id="size"
                  name="size"
                  value={size}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => { setSize(e.target.value) }}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-4 focus:ring-neutral-600 focus:outline-none"
                >
                  <option value="PP">PP</option>
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                </select>
              </label>
            </div>

            <div>
              <label htmlFor="type">
                Tipo
                <select
                  id="type"
                  name="type"
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-4 focus:ring-neutral-600 focus:outline-none"
                >
                  {
                    loading ? <option value="Carregando...">Carregando...</option> :
                      types?.map((type) => {
                        return (
                          <option key={type.ID} value={type.Name}>
                            {type.Name}
                          </option>
                        )
                      })
                  }
                </select>

              </label>
            </div>

            <div>
              <label htmlFor="category">
                Categorias
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => { setCategory(e.target.value) }}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-4 focus:ring-neutral-600 focus:outline-none"
                >
                  {
                    loading ?
                      <option value="Carregando...">Carregando...</option>
                      :

                      // Mapear as categorias e retornar um <option> para cada uma
                      categories?.map((category) => {
                        return (
                          <option key={category.ID} value={category.Name}>
                            {category.Name}
                          </option>
                        )
                      })
                  }
                </select>
              </label>
            </div>



          </div>

          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <input id="active" name="active" type="checkbox" defaultChecked
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-accent focus:ring-3 focus:ring-neutral-600 focus:outline-none" />
              <label htmlFor="active" className="text-neutral-600">
                Produto ativo?
              </label>
            </div>

            <span>
              SKU: {undefined!}
            </span>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-accent text-primary rounded-lg w-fit px-8 py-2 font-semibold flex items-center shadow-lg hover:bg-neutral-900">
              Cadastrar
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddProduct