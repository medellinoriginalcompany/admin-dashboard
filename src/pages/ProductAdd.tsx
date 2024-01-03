import { useNavigate } from "react-router-dom";
import ProductInput from "../components/form/ProductInput"
import React, { ChangeEvent, useState, useEffect } from "react"
import { useApi } from "../hooks/useApi";
import { motion } from "framer-motion";
import { ProductProperty } from "../types/product/Property";
import generateSKU from "../funcs/generateSKU";
import ReactQuill from "react-quill";
import DefaultPage from "../components/page/DefaultPage";
import ProductAddModal from "../components/ProductAddModal";
import 'react-quill/dist/quill.snow.css';

import erricon from '/icons/danger-red.svg';
import imgicon from '/icons/gallery-add.svg';
import arrowicon from '/icons/arrow-left.svg';

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
  const [discountedPrice, setDiscountedPrice] = useState<any>('');
  const [type, setType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

  const [errMsg, setErrMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

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

    // Para cada tamanho/cor selecionada criar um objeto com o ID do produto e o ID do tamanho/cor
    const sizesData = selectedSizes.map((size) => ({ id: 0, size }));
    const colorsData = selectedColors.map((color) => ({ id: 0, color }));

    console.log(productData);
    console.log(sizesData);
    console.log(colorsData);

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
        const productID = response.data.ID;

        if (response) {
          sizesData.forEach(async element => { // Para cada tamanho selecionado, adicionar uma relação entre o produto e o tamanho
            const res = await api.addProductRelation('tamanhos', productID, element);

            if (res) {
              colorsData.forEach(async element => { // Para cada cor selecionada, adicionar uma relação entre o produto e a cor
                const res = await api.addProductRelation('cores', productID, element);

                if (res) {
                  setSuccessMsg('Produto adicionado com sucesso! Redirecionando para a página de produtos...');
                  setTimeout(() => {
                    navigate('/produtos');
                  }, 1500); // 1.5 segundos
                }
              });
            }
          });
        };
      };

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

  const closeModal = () => {
    setModalIsOpen(false); // Fecha o modal
  }

  const openModal = (type: ProductProperty[]) => {
    setModalComponent(<ProductAddModal type={type} close={closeModal} />);
    setModalIsOpen(true); // Abre o modal]
  }

  // Fechar modal com ESC, limpar modal e eventlistener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    }

    if (modalIsOpen) window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

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

  useEffect(() => { // Atualizar SKU
    const skuManufact = manufacturer;
    const skuType = type;
    const skuCategory = category;

    const sku = generateSKU(skuManufact, skuType, skuCategory);
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

  }, [manufacturer, category, price, type, selectedSizes, selectedColors]);

  useEffect(() => {
    setErrMsg('');
    setSuccessMsg('');
  }, [name, description, price, discountedPrice, type, category, active])

  return (
    <DefaultPage>
      <div className="w-full">
        <button onClick={() => navigate(-1)} className="w-fit flex items-center gap-2 cursor-pointer px-3 py-0.5 rounded-md hover:bg-neutral-200">
          <img src={arrowicon} className="w-4" alt='Voltar' />
          <span>Voltar</span>
        </button>
        <div className="m-2">
          <h2 className="text-xl font-semibold text-neutral-600">
            Cadastrar produto
          </h2>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="w-full bg-neutral-50 -my-4 px-5 py-5 rounded-lg">
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

              <img src={erricon} alt="" />
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
                  <div className="flex items-center justify-center mx-auto h-full bg-white border border-neutral-300 rounded-md">
                    <img src={imgicon} className="brightness-[3]" alt='' />
                  </div>
                  <img src={imagePreview} alt="" className="absolute top-0 w-fit min-h-full object-cover z-20 rounded-md" />

                </div>
              </label>

              <label htmlFor="images" className="grid grid-cols-4 gap-1 my-2 rounded-lg cursor-pointer">
                {imagesPreview.map((preview) => (
                  <img key={preview} src={preview} className="w-20 h-20 object-cover rounded-lg" alt='' />
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

            <form onSubmit={handleSubmit} className="space-y-4 -mt-4 max-w-4xl w-full">
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
                  className="bg-accent text-primary rounded-md w-fit px-8 py-2 font-semibold flex items-center">
                  Cadastrar
                </button>
              </div>

            </form>

          </div>

        </div>
        <div className="-my-4 space-y-4 max-w-sm rounded-lg bg-neutral-50 p-4">
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
                className="w-full p-2 rounded-md font-normal cursor-pointer border border-neutral-300 focus:ring-2 focus:ring-blue-300 focus:outline-none">
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
                className="w-full p-2 rounded-md font-normal cursor-pointer border border-neutral-300 focus:ring-2 focus:ring-blue-300 focus:outline-none">
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
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium py-1 mr-2 min-w-max">
                Tamanho
              </h4>
              <hr className="w-full border-neutral-300" />
              {selectedSizes.length > 0 && (
                <button className="py-0.5 px-3 ml-2 min-w-max text-sm text-red-500 bg-red-50 rounded hover:text-white hover:bg-red-500" onClick={() => setSelectedSizes([])}>
                  Limpar
                </button>
              )}
            </div>
            <h4 className="text-sm text-neutral-500">
              Tamanhos disponíveis
            </h4>
            <div className="flex flex-wrap gap-1">
              {sizes.map((size) => (
                <button key={size.ID} value={size.ID} disabled
                  className={selectedSizes.includes(size.ID) ?
                    "bg-accent text-white font-medium my-0.5 h-8 w-12 rounded border border-neutral-800 hover:bg-accent hover:text-white" :
                    "bg-neutral-50 text-neutral-400 font-medium my-0.5 h-8 w-12 rounded border border-neutral-300"}>
                  {size.Name}
                </button>
              ))}
            </div>

            <button onClick={() => openModal(sizes)}
              className="bg-neutral-100 border border-neutral-300 flex items-center justify-center gap-2 w-full py-1.5 rounded font-medium mt-5 mb-2 text-sm group duration-75 hover:bg-accent hover:text-white hover:border-neutral-800">
              <span>
                Clique aqui para selecionar os tamanhos
              </span>
              <img src={arrowicon} alt="" className="group-hover:brightness-[6] w-4 rotate-[135deg] duration-75" />
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium py-1 mr-2 min-w-max">
                Cor
              </h4>
              <hr className="w-full border-neutral-300" />
              {selectedColors.length > 0 && (
                <button className="py-0.5 px-3 ml-2 min-w-max text-sm text-red-500 bg-red-50 rounded hover:text-white hover:bg-red-500" onClick={() => setSelectedColors([])}>
                  Limpar
                </button>
              )}
            </div>
            <h4 className="text-sm text-neutral-500">
              Cores disponíveis
            </h4>
            <div className="flex flex-wrap gap-1">
              {colors.map((color) => (
                <button key={color.ID} value={color.ID} disabled
                  className={selectedColors.includes(color.ID) ?
                    "bg-accent text-white font-medium my-0.5 px-3 py-1 rounded border border-neutral-800 hover:bg-accent hover:text-white" :
                    "bg-neutral-50 text-neutral-400 font-medium w-20 text-ellipsis overflow-x-hidden whitespace-nowrap my-0.5 px-3 py-1 rounded border border-neutral-300"}>
                  {color.Name}
                </button>
              ))}
            </div>

            <button onClick={() => openModal(colors)}
              className="bg-neutral-100 border border-neutral-300 flex items-center justify-center gap-2 w-full py-1.5 rounded font-medium mt-5 mb-4 text-sm group duration-75 hover:bg-accent hover:text-white hover:border-neutral-800">
              <span>
                Clique aqui para selecionar as cores
              </span>
              <img src={arrowicon} alt="" className="group-hover:brightness-[6] w-4 rotate-[135deg] duration-75" />
            </button>
          </div>
        </div>
      </div>

      {modalIsOpen ? modalComponent : ''}


    </DefaultPage>
  )
}

export default ProductAdd