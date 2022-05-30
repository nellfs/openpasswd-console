import { PropsWithChildren } from 'react';

export interface ButtonProps {
    type: 'submit' | 'reset' | 'button';
    disabled?: boolean;
    onClick?: () => void;
}

function DefaultButton(props: PropsWithChildren<ButtonProps>) {
    return (
        <button
            className='
          inline-block
          px-7 py-3
          font-others
          font-bold
          bg-sky-600
         text-white
          text-1xl leading uppercase 
          rounded-2xl
          hover:bg-secure-blue 
          focus:bg-blue-600  focus:outline-none focus:ring-0
          active:bg-blue-800 
          transition duration-100 ease-in-out
          w-full'

            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default DefaultButton;