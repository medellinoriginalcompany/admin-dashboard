import React from 'react'

type Props = {
  label: string,
  name: string,
  type: string,
  value: string,
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  maxLength?: number,
  placeholder?: string,
  autoFocus?: boolean,
}

const ProductInput = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.name} className='relative font-medium'>
        {props.label}
      </label>
      <div className='relative'>
        {
          props.name === 'price' ?
          <div className='absolute p-2 bottom-0 '>
            <span className='leading-relaxed bg-green-200 rounded text-green-600 py-0 px-1 text-sm'>
              R$
            </span>

          </div>
            :
            ''
        }
        <input
          id={props.name}
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.handleOnChange}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          className={"w-full p-2 border border-neutral-300 rounded-sm focus:ring-1 focus:ring-neutral-600 focus:outline-none " + (props.name === 'price' ? 'pl-9' : '')}
          required
          autoComplete='off'
          autoFocus={props.autoFocus}
        />
      </div>
    </div>
  )
}

export default ProductInput