import { motion } from "framer-motion"

type Props = {
  content: string
}

const Confirmation = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[87%] fixed bottom-0 right-0 bg-green-500 text-white text-center py-2"
    >
      {props.content}
    </motion.div>
  )
}

export default Confirmation