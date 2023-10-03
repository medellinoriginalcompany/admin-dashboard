import { motion } from "framer-motion"
import AccordionItem from "./AccordionItem"

const ProductsAccordion = () => {
  return (
    <motion.div className="bg-neutral-200/70 rounded-b pl-12 accordion-div"
      initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
      exit={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1, transition: { duration: .4, ease: 'easeOut' } }}
    >
      <ul className="border-l-2 border-neutral-400">
        <AccordionItem link="/produtos/cadastrar" content="Cadastrar produto" />
        <AccordionItem link="/produtos" content="Ver produtos" />
        <AccordionItem link="/produtos/propriedades" content="Propriedades" />
      </ul>
    </motion.div>
  )
}

export default ProductsAccordion