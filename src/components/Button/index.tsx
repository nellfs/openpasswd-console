import { PropsWithChildren } from 'react';

export interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={props.type}
      className="
          inline-block
          px-7 py-3
          disabled:bg-slate-600
          bg-secure-blue
          text-white
          font-medium text-sm leading-snug uppercase
          rounded
          hover:bg-blue-600 
          focus:bg-blue-600  focus:outline-none focus:ring-0
          active:bg-blue-800 
          transition duration-100 ease-in-out
          w-full
        "
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function RoundButton(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={props.type}
      className="
            flex items-center justify-center
            px-6 py-6
            max-v-14 max-h-14
            disabled:bg-slate-600
            bg-blue-600
            text-white
            font-medium text-sm leading-snug uppercase
            rounded-full
            hover:bg-blue-700
            focus:bg-blue-700 focus:outline-none focus:ring-0
            active:bg-blue-800 
            transition duration-150 ease-in-out
          "
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
