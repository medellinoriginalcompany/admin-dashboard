import ResumeItem from './ResumeItem';

const Resume = () => {
  return (
    <div className="bg-white/60 backdrop-blur divide-x divide-gray-200 grid grid-cols-4 justify-items-center rounded-xl py-10">
      <ResumeItem
        icon='moneys'
        title='Receita Total'
        value='418.563,47'
        growth={true}
        growthValue='12,5%'
      />

      <ResumeItem
        icon='receipt-item'
        title='Vendas este mês'
        value='9.822'
        growth={true}
        growthValue='22,1%'
      />

      <ResumeItem
        icon='profile-2user'
        title='Total Clientes'
        value='12.631'
        growth={false}
        growthValue='2,5%'
      />

      <ResumeItem
        icon='box-2'
        title='Total Produtos'
        value='189'
        growth={false}
        growthValue='2,5%'
      />
    </div>
  )
}

export default Resume