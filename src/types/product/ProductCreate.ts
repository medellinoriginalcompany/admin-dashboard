interface ProductCreate {
  banner: string;
  name: string;
  description: string;
  price: string;
  size: string;
  type: string;
  category: string;
  color: string;
  active?: boolean;
  sku: string;
}

export default ProductCreate;