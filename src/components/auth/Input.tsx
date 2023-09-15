import React from 'react';

const Input: React.FC<any> = ({
  name,
  label,
  value,
  type,
  handleOnChange,
  handleFocus,
  ariainvalid,
  innerRef,
  required,
  maxlength,
  placeholder,
}) => {

  return (
    <div className="flex relative flex-col group">
      <label htmlFor={name} className='block mb-2 text-sm font-medium'>
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 focus:outline-none block w-full p-2.5"
        type={type}
        id={name}
        name={name}
        value={value}
        ref={innerRef}
        onChange={handleOnChange}
        onFocus={handleFocus}
        maxLength={maxlength}
        aria-invalid={ariainvalid}
        placeholder={placeholder}
        autoComplete='on'
        {...(required ? { required: true } : {})}
      />
    </div>
  );
};

export default Input;
