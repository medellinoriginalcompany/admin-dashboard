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
        <label htmlFor={name} className='block mb-2 text-sm font-medium'>
          {label}
        </label>
        <input
          className="w-full p-2 border border-neutral-300 rounded-sm font-normal focus:ring-1 focus:ring-neutral-600 focus:outline-none"
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
    );
  };

export default ProductInput