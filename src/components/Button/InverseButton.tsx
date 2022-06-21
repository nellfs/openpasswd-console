import { PropsWithChildren } from 'react';
export interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
}

function InverseButton(props: PropsWithChildren<ButtonProps>) {
  return (

    <button
      className='
          inline-block
          px-7 py-3
          disabled:bg-slate-600
          font-others
          font-semibold
          bg-white
        text-secure-blue
          text-1xl leading uppercase 
          rounded-2xl
          hover:bg-blue-300
          hover:text-white
          focus:bg-blue-600
            focus:text-white 
           focus:ring-0
          active:bg-blue-400 
          transition duration-200 ease-in-out
          w-full'

      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default InverseButton;