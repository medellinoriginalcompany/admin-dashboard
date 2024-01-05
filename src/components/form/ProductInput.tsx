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
      <label htmlFor={props.name} className='block text-sm font-medium dark:text-neutral-500'>
        {props.label}
      </label>
      <div className={props.name === 'price' ? 'relative' : ''}>
        {props.name === 'price' && (
          <label htmlFor='price' className="absolute top-1/2 left-2 transform -translate-y-1/2 text-sm text-green-500 bg-green-100 px-1 rounded dark:bg-green-500 dark:text-neutral-800">
            R$
          </label>
        )}
        <input
          className={"w-full p-2 bg-white border border-neutral-300 rounded font-normal focus:ring-2 focus:ring-blue-300 focus:outline-none placeholder:text-neutral-400 dark:bg-neutral-915 dark:border-neutral-800 dark:focus:ring-blue-400 dark:text-neutral-300 dark:placeholder-neutral-700"
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