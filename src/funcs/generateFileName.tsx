function generateFileName(sku: string) {
  // Gerar data como 20240102
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário
  const day = date.getDate().toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário

  const fileName = year + month + day + '_' + sku;

  return fileName;
}

export default generateFileName;