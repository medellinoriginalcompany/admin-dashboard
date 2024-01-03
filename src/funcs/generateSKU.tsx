
const generateSKU = (manufact: string, type: string, category: string, color: string, print: string) => {
  // Três primeiras letras do fabricante
  const first = manufact.charAt(0) + manufact.charAt(1) + manufact.charAt(2);

  // Três primeiras letras do tipo
  const second = type.charAt(0) + type.charAt(1) + type.charAt(2);

  // Três primeiras letras da categoria
  const third = category.charAt(0) + category.charAt(1) + category.charAt(2);

  // Quatro primeiras letras da cor
  const fourth = color.charAt(0) + color.charAt(1) + color.charAt(2) + color.charAt(3);

  // Três primeiras letras da estampa
  const fifth = print.charAt(0) + print.charAt(1) + print.charAt(2);

  // Gerar data como 20240102
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário
  const day = date.getDate().toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário

  // Gerar SKU em caixa alta
  const sku = (first + second + third + fourth + fifth).toUpperCase() + year + month + day;

  return sku;
}

export default generateSKU