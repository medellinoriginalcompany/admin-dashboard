// Tipo Produto deve ser em PascalCase
export type Product = {
  ID: number,
  Name: string,
  Description: string,
  SKU: string,
  Price: string,
  Stock: string,
  Active: boolean,
  Discount?: number,
  Banner: string,
  Category: string,
  Size?: string,
  Color?: string,
  Type?: string,

}