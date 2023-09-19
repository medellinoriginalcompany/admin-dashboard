// Tipo Produto deve ser em PascalCase
export type Product = {
  ID: number,
  Name: string,
  Description: string,
  SKU: string,
  Price: number,
  Stock: number,
  Active: boolean,
  Discount?: number,
  Banner: string,
  CategoryID: number,
  SizeID: number,
}