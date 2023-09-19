
const generateSKU = (manufact: string, type: string, color: string, size: string, category: string,) => { // TODO: Adicionar o parâmetro de fabricante
  // Pegar as três primeiras letras do fabricante
  const firstLetter = manufact.charAt(0) + manufact.charAt(1) + manufact.charAt(2);

  // Pegar as três primeiras letras do tipo
  const secondLetter = type.charAt(0) + type.charAt(1) + type.charAt(2);

  // Pegar as quatro primeiras letras da cor
  const thirdLetter = color.charAt(0) + color.charAt(1) + color.charAt(2);

  // Pegar as duas primeiras letras do tamanho
  const fourthLetter = size.charAt(0) + size.charAt(1) + size.charAt(2);
  
  // Pegar as três primeiras letras da categoria
  const fifthLetter = category.charAt(0) + category.charAt(1) + category.charAt(2);

  // Gerar SKU em caixa alta
  const sku = (firstLetter + secondLetter + thirdLetter + fourthLetter + fifthLetter).toUpperCase();

  return sku;
}

export default generateSKU