import { useNavigate } from "react-router-dom";
import ProductInput from "../components/form/ProductInput"
import { ChangeEvent, useState, useEffect } from "react"
import { useApi } from "../hooks/useApi";
import { motion } from "framer-motion";
import { ProductProperty } from "../types/product/Property";
import generateSKU from "../funcs/generateSKU";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import erricon from '/icons/danger-red.svg';
import imgicon from '/icons/gallery-add.svg';
import arrowicon from '/icons/arrow-left.svg';
import DefaultPage from "../components/page/DefaultPage";

const ProductAdd = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | Cadastrar produto';

  const api = useApi();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<any>('');
  const [stock, setStock] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [discountedPrice, setDiscountedPrice] = useState<any>('');
  const [type, setType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

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
  async function handleSubmit(e: React.SyntheticEvent) {
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
    }

    console.log(productData)

    try {
      if (!file) {
        setErrMsg('Selecione uma imagem para o banner');
        return;
      }
      setErrMsg('');
      setSuccessMsg('Carregando imagens...')
      const upload = await api.uploadImage(file, fileName);

      if (upload) {
        const response = await api.addProduct(productData);
        if (response) { 
          setSuccessMsg('Produto adicionado com sucesso! Redirecionando para a página de produtos...');
          setTimeout(() => {
            navigate('/produtos');
          }, 1500); // 1.5 segundos
        }
      }

    } catch (error: any) {
      setSuccessMsg(''); // Limpa a mensagem de sucesso
      setErrMsg(error.message)
      console.log(error.response.data.body)
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

  const selectSizes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const size = Number((e.target as HTMLButtonElement).value);
    if (selectedSizes.includes(size)) {
      // Remover o tamanho do array
      const newSizes = selectedSizes.filter((s) => s !== size);
      setSelectedSizes(newSizes);
    } else {
      // Adicionar o tamanho ao array
      setSelectedSizes([...selectedSizes, size]);
    }
  }

  const selectColors = (e: React.MouseEvent<HTMLButtonElement>) => {
    const color = Number((e.target as HTMLButtonElement).value);
    if (selectedColors.includes(color)) {
      // Remover o tamanho do array
      const newColors = selectedColors.filter((s) => s !== color);
      setSelectedColors(newColors);
    } else {
      // Adicionar o tamanho ao array
      setSelectedColors([...selectedColors, color]);
    }
  }

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
        setErrMsg(error.response.data.message)
        console.log(error);
      }
    };

    getData();
  }, [])

  useEffect(() => {
    const skuManufact = 'Fabricante';
    const skuType = type;
    const skuColor = 'color';
    const skuSize = 'size';
    const skuCategory = category;

    const sku = generateSKU(skuManufact, skuType, skuColor, skuSize, skuCategory);
    setSku(sku);

    if (file && sku) {
      // Gerar nome para a imagem 20231006-SKU.extensão
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // +1 porque os meses começam em 0
      const day = date.getDate();

      const fileName = `${year}${month}${day}-${sku}`;
      console.log(fileName)
      setFileName(fileName);
    }

    console.log('cor: ' + selectedColors)
    console.log('tamanho: ' + selectedSizes)

  }, [category, price, type, selectedSizes, selectedColors]);

  useEffect(() => {
    setErrMsg('');
    setSuccessMsg('');
  }, [name, description, price, discountedPrice, type, category, active])

  return (
    <DefaultPage>
      <div className="w-full">
        <div onClick={() => navigate(-1)} className="w-fit flex gap-2 cursor-pointer">
          <img src={arrowicon} className="w-4" />
          <span>Voltar</span>
        </div>
        <div className="mx-2">
          <h2 className="text-xl font-semibold text-neutral-600">
            Cadastrar produto
          </h2>
        </div>
      </div>
      <div className="flex space-x-5">
        <div className="w-full bg-white/60 -my-4 px-5 py-5 rounded-lg">
          {errMsg ?
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
            : ''}
          {successMsg ?
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
            : ''}

          <div className="flex space-x-5">
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

            <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl w-full">
              <input type="file" name="banner" id="banner" className="hidden" accept="image/*" onChange={bannerChange} />
              <input type="file" name="images" id="images" className="hidden" accept="image/*" multiple onChange={imagesChange} />

              <ProductInput
                label="Nome"
                name="name"
                type="text"
                value={name}
                handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
                maxLength={200}
                placeholder="Digite o nome do produto"
                autoFocus
              />

              <ReactQuill theme="snow" value={description} onChange={setDescription} className="bg-white/70 pb-10 h-80" placeholder="Digite a descrição" />

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
                <button type="submit"
                  disabled={!(imagePreview && name && description && price && stock && type && category)}
                  className="bg-accent text-primary rounded-lg w-fit px-8 py-2 font-semibold flex items-center shadow-lg hover:bg-accent/80">
                  Cadastrar
                </button>
              </div>

            </form>

          </div>

        </div>
        <div className="-my-4 space-y-5 max-w-sm rounded-lg">
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
                className="w-full p-2 bg-white/70 rounded-sm font-normal cursor-pointer focus:ring-1 focus:ring-neutral-600 focus:outline-none">
                <option value="" disabled>
                  Selecionar categoria
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
            <label htmlFor="type" className="font-medium">
              <span className="text-sm">
                Tipo
              </span>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => { setType(e.target.value) }}
                className="w-full p-2 bg-white/70 rounded-sm font-normal cursor-pointer focus:ring-1 focus:ring-neutral-600 focus:outline-none">
                <option value="" disabled>
                  Selecionar tipos
                </option>

                {
                  loading ?
                    <option value="Carregando...">Carregando...</option>
                    :

                    // Mapear as categorias e retornar um <option> para cada uma
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
            <h4 className="text-sm font-medium py-1">
              Selecionar tamanhos
            </h4>
            <div className="flex flex-wrap gap-1">
              {sizes.map((size) => (
                <button key={size.ID} onClick={selectSizes} value={size.ID}
                  className={selectedSizes.includes(size.ID) ?
                    "bg-accent text-white font-medium px-3 py-1 rounded hover:bg-accent hover:text-white" :
                    "bg-white/60 font-medium px-3 py-1 rounded hover:bg-accent hover:text-white"}>
                  {size.Name}
                </button>
              ))}
            </div>
            {selectedSizes.length > 0 && (
              <button className="py-2 text-red-500" onClick={() => setSelectedSizes([])}>
                Limpar
              </button>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium py-1">
              Selecionar cores
            </h4>
            <div className="flex flex-wrap gap-1">
              {colors.map((color) => (
                <button key={color.ID} onClick={selectColors} value={color.ID}
                  className={selectedColors.includes(color.ID) ?
                    "bg-accent text-white font-medium px-3 py-1 rounded hover:bg-accent hover:text-white" :
                    "bg-white/60 font-medium px-3 py-1 rounded hover:bg-accent hover:text-white"}>
                  {color.Name}
                </button>
              ))}
            </div>
            {selectedColors.length > 0 && (
              <button className="py-2 text-red-500" onClick={() => setSelectedColors([])}>
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>

    </DefaultPage>
  )
}

export default ProductAdd