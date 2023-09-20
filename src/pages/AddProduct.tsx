import { Link, useNavigate } from "react-router-dom";
import ProductInput from "../components/form/ProductInput"
import { ChangeEvent, useState, useEffect } from "react"
import { useApi } from "../hooks/useApi";
import erricon from '/icons/danger.svg';
import { motion } from "framer-motion";
import { ProductProperties } from "../types/product/Properties";
import generateSKU from "../funcs/generateSKU";

const AddProduct = () => {

  const api = useApi();

  const banner = 'product-placeholder.webp'
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [sku, setSku] = useState<string>('');

  const [errMsg, setErrMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

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
          setColors(response[3].colors)
          setLoading(false);
        }
      } catch (error: any) {
        setErrMsg(error.response.data.message)
        console.log(error);
      }
    };

    getData();
  }, [])

  useEffect(() => {
    setErrMsg('');
    setSuccessMsg('');
  }, [name, description, price, size, type, category, color, active])

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await api.addProduct(banner, name, description, price, size, type, category, color, active, sku);
      if (response) {
        setSuccessMsg('Produto adicionado com sucesso! Redirecionando para a página de produtos...');
        setTimeout(() => {
          navigate('/produtos');
        }, 3000); // 3 segundos
      }
    } catch (error: any) {
      setErrMsg(error.response.data.message);
      console.log(error.response.data.body)
    }
  }

  useEffect(() => {
    const skuManufact = 'Fabricante';
    const skuType = type;
    const skuColor = color;
    const skuSize = size;
    const skuCategory = category;

    const sku = generateSKU(skuManufact, skuType, skuColor, skuSize, skuCategory);
    setSku(sku);
  }, [category, size, price, type, color]);

  const selectCSS = "w-full p-2 border border-neutral-300 rounded-sm font-normal focus:ring-1 focus:ring-neutral-600 focus:outline-none";

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
        <form onSubmit={handleSubmit} className="space-y-2 max-w-fit">
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
              handleOnChange={(e: ChangeEvent<HTMLInputElement>) => {
                // Certifique-se de que o valor seja uma string válido antes de convertê-lo
                const newValue = e.target.value.replace(',', '.'); // Troca ',' por '.' para permitir números decimais
                setPrice(newValue);
              }}
              maxLength={7}
              placeholder="19.99"
            />
          </div>

          <div className="flex gap-4">
            <div>
              <label htmlFor="size" className="font-medium">
                Tamanho
                <select
                  id="size"
                  name="size"
                  value={size}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => { setSize(e.target.value) }}
                  className={selectCSS}>

                  <option value="" disabled>
                    Selecione o tamanho
                  </option>

                  {
                    loading ? <option value="Carregando...">Carregando...</option> :
                      sizes?.map((size) => {
                        return (
                          <option key={size.ID} value={size.Name}>
                            {size.Name}
                          </option>
                        )
                      })
                  }
                </select>
              </label>
            </div>

            <div>
              <label htmlFor="type" className="font-medium">
                Tipo
                <select
                  id="type"
                  name="type"
                  className={selectCSS}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => { setType(e.target.value) }}>
                  <option value="">
                    Selecione um tipo
                  </option>
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
              <label htmlFor="category" className="font-medium">
                Categorias
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => { setCategory(e.target.value) }}
                  className={selectCSS}>
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>

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

            <div>
              <label htmlFor="color" className="font-medium">
                Cor
                <select
                  id="color"
                  name="color"
                  className={selectCSS}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => { setColor(e.target.value) }}>
                  <option value="">
                    Selecione uma cor
                  </option>
                  {
                    loading ? <option value="Carregando...">Carregando...</option> :
                      colors?.map((color) => {
                        return (
                          <option key={color.ID} value={color.Name}>
                            {color.Name}
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
              <input id="active" name="active" type="checkbox" defaultChecked onChange={(e: ChangeEvent<HTMLInputElement>) => { setActive(e.target.checked) }}
                className="w-fit p-2 border border-neutral-300 rounded-sm accent-neutral-800 focus:ring-1 focus:ring-neutral-600 focus:outline-none" />
              <label htmlFor="active" className="text-neutral-600">
                Produto ativo?
              </label>
            </div>

            <span>
              SKU: {sku}
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