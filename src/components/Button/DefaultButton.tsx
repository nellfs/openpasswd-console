import { PropsWithChildren } from 'react';

export interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

function DefaultButton(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className='
          inline-block
          px-7 py-1.5
          font-others
          font-medium
        bg-secure-blue
        text-white
          text-1xl leading
          rounded-lg
        hover:bg-secure-blue 
        focus:bg-blue-600  focus:outline-none focus:ring-0
        active:bg-blue-800 
          transition duration-100 ease-in-out
          w-full
          h-full'

      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default DefaultButton;