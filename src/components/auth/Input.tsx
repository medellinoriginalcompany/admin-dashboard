import React from 'react';

type Props = {
  name: string,
  label: string,
  type: string,
  value: string | number,
  autoFocus?: boolean,
  maxLength?: number,
  placeholder?: string,
  required: boolean,
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: Props) => {

  return (
    <div className="flex relative flex-col group">
      <label htmlFor={props.name} className='text-sm font-medium mb-1 dark:text-neutral-500'>
        {props.label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none block w-full p-2.5
        dark:bg-neutral-900 dark:border-neutral-800 dark:focus:ring-blue-400 dark:text-neutral-200 dark:placeholder-neutral-700"
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleOnChange}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        required={props.required}
        autoComplete='on'
        autoFocus={props.autoFocus}
      />
    </div>
  );
};

export default Input;
