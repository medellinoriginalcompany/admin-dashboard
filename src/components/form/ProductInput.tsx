import React from 'react';

const ProductInput: React.FC<any> = ({
  name,
  label,
  value,
  type,
  handleOnChange,
  autoFocus,
  maxLength,
  placeholder
}) => {
  
    return (
      <div className="flex relative flex-col group">
        <label htmlFor={name} className='block text-sm font-medium'>
          {label}
        </label>
        <div className={name === 'price' ? 'relative' : ''}>
          {
            name === 'price' && (
              <label htmlFor='price' className="absolute top-1/2 left-2 transform -translate-y-1/2 text-sm text-green-600 bg-green-200 px-1 rounded">
                R$
              </label>
            )
          }
          <input
            className={"w-full p-2 bg-white/70 rounded-sm font-normal focus:ring-2 focus:ring-blue-300 focus:outline-none"
            + (name === 'price' ? ' pl-9' : '')}
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleOnChange}
            autoFocus={autoFocus}
            maxLength={maxLength}
            placeholder={placeholder}
            autoComplete='off'
          />
        </div>
      </div>
    );
  };

export default ProductInput