import React from 'react'

type Props = {
  name: string,
  label: string,
  type: string,
  value: string | number,
  autoFocus?: boolean,
  maxLength?: number,
  max?: number,
  placeholder?: string,
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductInput = (props: Props) => {
  return (
    <div className="flex relative flex-col group">
      <label htmlFor={props.name} className='block text-sm font-medium'>
        {props.label} {props.label === 'Preço com desconto' && (<span className='text-xs text-gray-500'>(opcional)</span>)}
      </label>
      <div className={props.name === 'price' ? 'relative' : ''}>
        {props.name === 'price' && (
          <label htmlFor='price' className="absolute top-1/2 left-2 transform -translate-y-1/2 text-sm text-green-600 bg-green-200 px-1 rounded">
            R$
          </label>
        )}
        <input
          className={"w-full p-2 bg-white/70 rounded-sm font-normal focus:ring-2 focus:ring-blue-300 focus:outline-none"
            + (props.name === 'price' ? ' pl-9' : '')}
          type={props.type}
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={props.handleOnChange}
          autoFocus={props.autoFocus}
          maxLength={props.maxLength}
          max={props.max}
          min={0}
          placeholder={props.placeholder}
          autoComplete='off'
        />
      </div>
    </div>
  )
}

export default ProductInput