import { ChangeEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductInput from '../components/form/ProductInput'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProductProperty } from '../types/product/Property'
import { useApi } from '../hooks/useApi'

import arrowicon from '/icons/arrow-left.svg'
import imgicon from '/icons/gallery-add.svg'
import erricon from '/icons/danger-red-outline.svg'
import generateSKU from '../funcs/generateSKU'
import DefaultPage from '../components/page/DefaultPage'
import cldConfig from '../hooks/useCloudinary'

const ProductEdit = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | Editar Produto';

  const api = useApi();
  const cld = cldConfig;
  const [params] = useSearchParams(); // Obter os parâmetros da URL

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<any>('');
  const [stock, setStock] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [discountedPrice, setDiscountedPrice] = useState<any>('');
  const [type, setType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const [errMsg, setErrMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const [categories, setCategories] = useState<ProductProperty[]>([]);
  const [types, setTypes] = useState<ProductProperty[]>([]);
  const [sizes, setSizes] = useState<ProductProperty[]>([]);
  const [colors, setColors] = useState<ProductProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>('');
  const [_, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const productData = {
      name,
      description,
      sku,
      price,
      stock,
      active,
      discountedPrice,
      banner: fileName,
      type,
      category,
      size,
      color,
    }
    console.log(productData)

    try {
      setErrMsg('');
      // Detectar se a imagem foi alterada
      if (file) {
        setSuccessMsg('Enviando imagem...');
        const upload = await api.uploadImage(file, fileName);

        if (upload) {
          const response = await api.editProduct(params.get('id')!, productData);
          if (response) {
            setSuccessMsg(response.message + 'Redirecionando para a página de produtos...');
            setTimeout(() => {
              navigate('/produtos');
            }, 1500); // 1.5 segundos
          }
        }
      } else {
        const response = await api.editProduct(params.get('id')!, productData);
        if (response) {
          setSuccessMsg(response.message + ' Redirecionando para a página de produtos...');
          setTimeout(() => {
            navigate('/produtos');
          }, 1500); // 1.5 segundos
        }
      }
    } catch (error: any) {
      setSuccessMsg(''); // Limpa a mensagem de sucesso
      setErrMsg(error.message)
    }
  }

  const bannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Gerar nome para a imagem 20231006-SKU.extensão
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // +1 porque os meses começam em 0
      const day = date.getDate();

      const fileName = `${year}${month}${day}-${sku}`;
      console.log(fileName)
      setFileName(fileName);

      setFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  const imagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages)

      // Crie um array de URLs para as visualizações das imagens
      const previews = selectedImages.map((image) => URL.createObjectURL(image));
      setImagesPreview(previews);
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        // Obter as propriedades dos produtos e produto
        const response = await Promise.all([
          api.getProductProperties(),
          api.getProduct(params.get('id')!),
        ]);

        if (response) {

          setCategories(response[0].categories);
          setTypes(response[0].types);
          setSizes(response[0].sizes);
          setColors(response[0].colors);

          setName(response[1].product.Name);
          setDescription(response[1].product.Description);
          setPrice(response[1].product.Price.toString());
          setStock(response[1].product.Stock.toString());
          setActive(response[1].product.Active);
          setDiscountedPrice(response[1].product.DiscountedPrice.toString());
          setFileName(response[1].product.Banner);
          setType(response[1].product.Type.Name);
          setCategory(response[1].product.Category.Name);
          setSize(response[1].product.Size.Name);
          setColor(response[1].product.Color.Name);
          setImagePreview(cld.image(response[1].product.Banner).toURL());
          console.log(price)

          setLoading(false);
        }
      } catch (error: any) {
        setErrMsg(error)
        console.log(error);
      }
    };

    getData();
  }, [])

  useEffect(() => {
    const skuManufact = 'Fabricante';
    const skuType = type;
    const skuColor = color;
    const skuSize = size;
    const skuCategory = category;

    const sku = generateSKU(skuManufact, skuType, skuColor, skuSize, skuCategory);
    setSku(sku);
  }, [category, size, price, type, color]);

  useEffect(() => {
    setErrMsg('');
    setSuccessMsg('');
  }, [name, description, price, size, type, category, color, active])


  const selectCSS = "w-full p-2 bg-white/70 rounded-sm font-normal focus:ring-1 focus:ring-neutral-600 focus:outline-none";

  return (
    <DefaultPage>
      <div className="max-w-6xl w-full mx-auto">
        <div onClick={() => navigate(-1)} className="w-fit flex gap-2 my-3 cursor-pointer" onKeyDown={()=> navigate(-1)}>
          <img src={arrowicon} className="w-4" />
          <p>Voltar</p>
        </div>
        <div className="my-3 mx-2">
          <h2 className="text-xl font-semibold text-neutral-600">
            Editar produto
          </h2>
        </div>

      </div>
      <div className="max-w-6xl w-full mx-auto bg-white/60 px-5 py-5 pb-28 rounded-lg">
        {
          errMsg ?
            <motion.div className='absolute bottom-0 max-w-6xl w-full flex justify-between items-center bg-red-300/30 p-3 rounded-lg border border-red-400 mb-3 font-semibold text-red-500'
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
            <motion.div className='absolute bottom-0 max-w-6xl w-full flex gap-3 justify-between items-center bg-green-100 px-3 py-2 rounded border border-green-400 mb-10 font-semibold text-green-500'
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

        <div className="flex h-[450px] space-x-5">
          <div className="flex flex-col">
            <label htmlFor="banner" className="cursor-pointer w-fit flex">
              <div className="w-80 min-h-[450px] relative">
                <div className="flex items-center justify-center mx-auto h-full bg-white">
                  <img src={imgicon} className="brightness-[3]" />
                </div>
                <img src={imagePreview} alt="" className="absolute top-0 w-fit min-h-full object-cover z-20" />

              </div>
            </label>

            <label htmlFor="images" className="grid grid-cols-4 gap-1 my-2 rounded-lg cursor-pointer">
              {imagesPreview.map((preview) => (
                <img key={preview} src={preview} className="w-20 h-20 object-cover rounded-lg" />
              ))}
              {
                imagesPreview.length < 4 && (
                  <label htmlFor="images" className="flex items-center justify-center mx-auto h-20 w-20 rounded-lg border border-neutral-300 hover:bg-neutral-200 cursor-pointer">
                    <img src={imgicon} className="brightness-[3] w-5" />
                  </label>
                )
              }
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="file" name="banner" id="banner" className="hidden" accept="image/*" onChange={bannerChange} />
            <input type="file" name="images" id="images" className="hidden" accept="image/*" multiple onChange={imagesChange} />


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

            <div className="flex gap-4">
              <div>
                <label htmlFor="size" className="font-medium">
                  <span className="text-sm">
                    Tamanho
                  </span>
                  <select
                    id="size"
                    name="size"
                    value={size}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => { setSize(e.target.value) }}
                    className={selectCSS}>

                    <option value="" disabled>
                      {size}
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
                  <span className="text-sm">
                    Tipo
                  </span>
                  <select
                    id="type"
                    name="type"
                    className={selectCSS}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => { setType(e.target.value) }}>
                    <option value="" disabled>
                      {type}
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
                  <span className="text-sm">
                    Categorias
                  </span>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => { setCategory(e.target.value) }}
                    className={selectCSS}>
                    <option value="" disabled>
                      {category}
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
                  <span className="text-sm">
                    Cor
                  </span>
                  <select
                    id="color"
                    name="color"
                    className={selectCSS}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => { setColor(e.target.value) }}>
                    <option value="">
                      {color}
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

            <div className="flex items-center space-x-3">
              <ProductInput
                label="Preço"
                name="price"
                type="tel"
                value={price}
                handleOnChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // Formatar , para .
                  const value = e.target.value.replace(',', '.');
                  setPrice(value);
                }}
                max={99999.99}
                placeholder="1099.99"
              />
              <ProductInput
                label="Preço com desconto"
                name="price"
                type="tel"
                value={discountedPrice ?? 0}
                handleOnChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // Formatar , para .
                  const value = e.target.value.replace(',', '.');
                  setDiscountedPrice(value);
                }}
                max={99999.99}
                placeholder="909.99"
              />
              {discountedPrice > 0 && (
                <span className="bg-green-200 text-green-600 px-3 mt-5 rounded ">
                  {discountedPrice ? Math.round((1 - (discountedPrice / price)) * 100) : 0}% OFF
                </span>
              )}
            </div>

            <div className="w-fit">
              <ProductInput
                label='Quantidade em estoque'
                name='stock'
                type='number'
                value={stock}
                handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setStock(e.target.value) }}
                maxLength={3}
                placeholder='0'
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <input id="active" name="active" type="checkbox" checked={active} onChange={() => setActive(!active)}
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
              <button type="submit" disabled={!(imagePreview && name && description && price && size && type && category && color)}
                className="bg-accent text-primary rounded-lg w-fit px-8 py-2 font-semibold flex items-center shadow-lg hover:bg-neutral-900">
                Cadastrar
              </button>
            </div>

          </form>

        </div>

      </div>
    </DefaultPage>
  )
}

export default ProductEdit