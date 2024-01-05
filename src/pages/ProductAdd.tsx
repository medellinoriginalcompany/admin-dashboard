import { useNavigate } from "react-router-dom";
import ProductInput from "../components/form/ProductInput"
import { ChangeEvent, useState, useEffect, FormEvent } from "react"
import { useApi } from "../hooks/useApi";
import { motion } from "framer-motion";
import { ProductProperty } from "../types/product/Property";
import generateSKU from "../funcs/generateSKU";
import ReactQuill from "react-quill";
import DefaultPage from "../components/page/DefaultPage";
import ProductAddModal from "../components/ProductAddModal";
import 'react-quill/dist/quill.snow.css';

import erricon from '/icons/danger-red-outline.svg';
import imgicon from '/icons/gallery-add.svg';
import arrowicon from '/icons/arrow-left.svg';
import externalicon from '/icons/external.svg';
import ProductData from "../types/product/ProductData";
import generateFileName from "../funcs/generateFileName";

const ProductAdd = () => {
  document.title = 'Cadastrar produto | ' + import.meta.env.VITE_APP_TITLE;

  const api = useApi();

  const [manufacturer, setManufacturer] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<any>('');
  const [stock, setStock] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [discountPercentage, setDiscountPercentage] = useState<any>('');
  const [type, setType] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [print, setPrint] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number }>({});

  const [errMsg, setErrMsg] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [boxColor, setBoxColor] = useState<string>('blue');

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalComponent, setModalComponent] = useState<any>(null);

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const productData: ProductData = {
      banner: fileName,
      name,
      description,
      price,
      discountPercentage,
      stock,
      active,
      manufacturer,
      print,
      category,
      type,
      color,
      sku,

      sizes: selectedSizes,
    }

    console.log(productData);

    try {
      if (!file) {
        setErrMsg('Selecione uma imagem para o banner');
        return;
      }
      setErrMsg('');
      setMessage('Criando produto na base de dados...');
      const response = await api.addProduct(productData);

      if (response) {
        setTimeout(async () => {
          setMessage('Produto criado com sucesso! Enviando imagens...');

          const upload = await api.uploadImage(file, fileName);

          if (upload) {
            setTimeout(() => {
              setBoxColor('green');
              setMessage('Tudo certo! Redirecionando...');
              setTimeout(() => {
                navigate('/produtos');
              }, 1300);
            }, 1000);
          }
        }, 1000);
      }

    } catch (error: any) {
      if (error.message === 'Network Error') {
        setMessage('');
        setErrMsg('Erro de conexão. Tente novamente mais tarde.');
        return;
      }
      setTimeout(() => { setMessage(''); setErrMsg(error.response.data.message + ': ' + error.response.data.error) }, 1000); // Limpa a mensagem de sucesso

      console.log(error.response.data.body)
    }
  }

  const bannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileName(generateFileName(sku));
      console.log(fileName)

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

  const closeModal = () => {
    setModalIsOpen(false); // Fecha o modal
  }

  const openModal = (type: ProductProperty[], callback: (sizeQuantities: { [key: string]: number }) => void) => {
    setModalComponent(<ProductAddModal type={type} close={closeModal} onSave={callback} />);
    setModalIsOpen(true); // Abre o modal
  }

  // Verificar se o tamanho foi selecionado
  const hasValueForSize = (size: string): boolean => {
    return selectedSizes.hasOwnProperty(size) && selectedSizes[size] > 0;
  };

  const handleSaveModal = (sizeQuantities: { [key: string]: number }) => {
    // Armazena os tamanhos selecionados
    setSelectedSizes(sizeQuantities);
  };

  useEffect(() => { // Fechar modal com ESC, limpar modal e eventlistener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    }

    if (modalIsOpen) window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  useEffect(() => { // Coletar dados das propriedades do produto
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

  useEffect(() => { // Atualizar SKU e nome do BANNER
    const skuManufact = manufacturer;
    const skuType = type;
    const skuCategory = category;
    const skuColor = color;
    const skuPrint = print;

    const sku = generateSKU(skuManufact, skuType, skuCategory, skuColor, skuPrint);
    setSku(sku);

    if (file && sku) {
      setFileName(generateFileName(sku));
      console.log(fileName)
    }

  }, [manufacturer, category, type, color, print]);

  useEffect(() => { // Limpar mensagens de erro e sucesso
    setErrMsg('');
    setMessage('');
  }, [name, description, price, discountPercentage, type, category, active])

  return (
    <DefaultPage>
      <div className="w-full">
        <button onClick={() => navigate(-1)} className="w-fit flex items-center gap-2 cursor-pointer px-3 py-0.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800">
          <img src={arrowicon} className="w-4 dark:brightness-[6]" alt='Voltar' />
          <span className="dark:text-neutral-300">Voltar</span>
        </button>
        <div className="m-2">
          <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-300">
            Cadastrar produto
          </h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <div className="w-full bg-neutral-50 -my-4 px-5 py-5 rounded-lg dark:bg-neutral-900">
          <div className="flex flex-col-reverse 2xl:flex-row 2xl:space-x-5">
            <div className="flex items-center space-x-5 2xl:flex-col 2xl:space-x-0">
              <label htmlFor="banner" className="cursor-pointer w-fit flex">
                <div className="w-80 min-h-[450px] relative">
                  <div className="flex items-center justify-center mx-auto h-full bg-white border border-neutral-300 rounded-md">
                    <img src={imgicon} className="brightness-[3]" alt='' />
                  </div>
                  <img src={imagePreview} alt="" className="absolute top-0 w-fit min-h-full object-cover z-20 rounded-md" />

                </div>
              </label>

              <label htmlFor="images" className="flex flex-col flex-wrap gap-1 my-2 rounded-lg cursor-pointer 2xl:flex-row">
                {imagesPreview.map((preview) => (
                  <img key={preview} src={preview} className="w-28 h-28 2xl:w-[77px] 2xl:h-[77px] object-cover rounded-lg" alt='' />
                ))}
                {
                  imagesPreview.length < 4 && (
                    <label htmlFor="images" className="flex items-center justify-center mx-auto h-20 w-20 rounded-md bg-white border border-neutral-300 hover:bg-neutral-200 cursor-pointer">
                      <img src={imgicon} className="brightness-[3] w-5" alt='' />
                    </label>
                  )
                }
              </label>
            </div>

            <div className="space-y-4 -mt-4 max-w-4xl w-full">
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
                <div className="flex flex-col">
                  <label htmlFor='discount' className='text-sm font-medium'>
                    Desconto <span className='text-xs text-gray-500' title="Insira a porcentagem de desconto. O desconto é opcional">(?)</span>
                  </label>
                  <input
                    className="w-fit p-2 bg-white border border-neutral-300 rounded font-normal focus:ring-2 focus:ring-blue-300 focus:outline-none placeholder:text-neutral-400"
                    type='number'
                    id='discount'
                    name='discount'
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    maxLength={3}
                    max={100}
                    min={1}
                    placeholder='1-100%'
                  />
                </div>
                <span className="bg-green-200 text-green-600 px-3 mt-5 rounded">
                  R$ {discountPercentage ? (price - (price * discountPercentage / 100)).toFixed(2) : 0}
                </span>
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

              <div className="flex items-center space-x-2">
                <input id="active" name="active" type="checkbox" defaultChecked onChange={(e: ChangeEvent<HTMLInputElement>) => { setActive(e.target.checked) }}
                  className="w-fit p-2 border border-neutral-300 rounded-sm accent-neutral-800 focus:ring-1 focus:ring-neutral-600 focus:outline-none" />
                <label htmlFor="active" className="text-neutral-600">
                  Produto ativo?
                </label>
              </div>

            </div>

          </div>

        </div>
        <div className="-my-4 space-y-4 max-w-md rounded-lg bg-neutral-50 p-4">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium py-1 mr-2 min-w-max">
                Fabricante
              </h4>
              <hr className="w-full border-neutral-300" />
            </div>
            <ProductInput
              name="manufacturer"
              label={''}
              type="text"
              value={manufacturer}
              handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setManufacturer(e.target.value) }}
              maxLength={200}
              placeholder="Digite o nome do fabricante"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium py-1 mr-2 min-w-max">
                Estampa
              </h4>
              <hr className="w-full border-neutral-300" />
            </div>
            <ProductInput
              name="print"
              label={''}
              type="text"
              value={print}
              handleOnChange={(e: ChangeEvent<HTMLInputElement>) => { setPrint(e.target.value) }}
              maxLength={200}
              placeholder="Digite o nome da estampa"
            />
          </div>
          <div>
            <label htmlFor="category" className="font-medium">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm">
                  Categoria
                </span>
                <hr className="w-full border-neutral-300" />
              </div>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => { setCategory(e.target.value) }}
                className="w-full p-2 rounded-md font-normal cursor-pointer bg-white border border-neutral-300 focus:ring-2 focus:ring-blue-300 focus:outline-none">
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
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm">
                  Tipo
                </span>
                <hr className="w-full border-neutral-300" />
              </div>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => { setType(e.target.value) }}
                className="w-full p-2 rounded-md font-normal cursor-pointer bg-white border border-neutral-300 focus:ring-2 focus:ring-blue-300 focus:outline-none">
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
            <label htmlFor="color" className="font-medium">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm">
                  Cor
                </span>
                <hr className="w-full border-neutral-300" />
              </div>
              <select
                id="color"
                name="type"
                value={color}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => { setColor(e.target.value) }}
                className="w-full p-2 rounded-md font-normal cursor-pointer bg-white border border-neutral-300 focus:ring-2 focus:ring-blue-300 focus:outline-none">
                <option value="" disabled>
                  Selecionar cor
                </option>

                {
                  loading ?
                    <option value="Carregando...">Carregando...</option>
                    :
                    // Mapear as categorias e retornar um <option> para cada uma
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

          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium py-1 mr-2 min-w-max">
                Tamanho
              </h4>
              <hr className="w-full border-neutral-300" />
            </div>
            <h4 className="text-sm text-neutral-500">
              Tamanhos disponíveis
            </h4>
            <div className="flex flex-wrap justify-between gap-1">
              {sizes.map((size) => (
                <button key={size.ID} value={size.ID} disabled
                  className={hasValueForSize(size.ID.toString()) ?
                    "bg-accent text-white font-medium my-0.5 h-8 w-12 rounded border border-neutral-800 hover:bg-accent hover:text-white" :
                    "bg-neutral-50 text-neutral-400 font-medium my-0.5 h-8 w-12 rounded border border-neutral-300"}>
                  {size.Name}
                </button>
              ))}
            </div>

            <button onClick={() => openModal(sizes, handleSaveModal)} type="button"
              className="bg-neutral-100 border border-neutral-300 flex items-center justify-between gap-2 w-full py-1.5 rounded font-medium mt-5 mb-2 text-sm group duration-75 hover:bg-accent hover:text-white hover:border-neutral-800">
              <span className="mx-auto">
                Clique aqui para selecionar os tamanhos
              </span>
              <img src={externalicon} alt="" className="group-hover:brightness-[6] -ml-5 mr-3 w-4 -scale-x-100 duration-75" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-5">
            <span className="min-w-[205px] text-sm bg-neutral-50 border border-neutral-200 text-neutral-500 px-3 py-0.5 font-semibold rounded">
              {sku}
            </span>

            <button type="submit"
              disabled={!(imagePreview && name && description && price && stock && type && category && manufacturer && color)}
              className="bg-accent text-primary rounded-md w-fit px-8 py-2 font-semibold flex items-center min-w-max disabled:bg-neutral-100 border disabled:border-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed">
              Cadastrar produto
            </button>
          </div>
          {errMsg &&
            <motion.div className='flex justify-between items-center gap-3 bg-red-100 p-3 rounded-md font-semibold text-red-500 break-all'
              initial={{ maxHeight: '0%', opacity: 0, translateY: -50 }}
              animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
              transition={{
                duration: 1,
                type: 'spring',
              }}>
              <p>
                {errMsg}
              </p>

              <img src={erricon} alt="" className="w-5" />
            </motion.div>
          }
          {message &&
            <motion.div className={'flex justify-between items-center gap-3 bg-' + boxColor + '-100 p-3 rounded-md font-semibold text-' + boxColor + '-500 break-all'}
              initial={{ maxHeight: '0%', opacity: 0, translateY: -50 }}
              animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
              transition={{
                duration: 1,
                type: 'spring',
              }}
            >
              <p>
                {message}
              </p>
              <div className={'w-3 h-3 rounded-full border-2 border-' + boxColor + '-500 border-t-transparent animate-spin'}></div>
            </motion.div>
          }
        </div>
      </form>

      {modalIsOpen ? modalComponent : ''}

    </DefaultPage>
  )
}

export default ProductAdd