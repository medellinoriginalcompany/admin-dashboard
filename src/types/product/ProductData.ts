interface ProductData {
  banner: string,
  name: string,
  description: string,
  price: string,
  discountPercentage: string,
  stock: string,
  active: boolean,
  manufacturer: string,
  print: string,
  category: string,
  type: string,
  color: string,
  sku: string,

  sizes: { [key: string]: number },
}

export default ProductData;