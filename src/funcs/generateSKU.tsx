
const generateSKU = (manufact: string, type: string, category: string,) => {
  // Pegar as três primeiras letras do fabricante
  const firstLetter = manufact.charAt(0) + manufact.charAt(1) + manufact.charAt(2);

  // Pegar as três primeiras letras do tipo
  const secondLetter = type.charAt(0) + type.charAt(1) + type.charAt(2);
  
  // Pegar as três primeiras letras da categoria
  const fifthLetter = category.charAt(0) + category.charAt(1) + category.charAt(2);

  // Gerar data como 20240102
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário
  const day = date.getDate().toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário

  // Gerar SKU em caixa alta
  const sku = (firstLetter + secondLetter + fifthLetter).toUpperCase() + year + month + day;

  return sku;
}

export default generateSKU