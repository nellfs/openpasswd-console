import { PropsWithChildren } from 'react';

import DefaultButton from './DefaultButton'
import InverseButton from './InverseButton';

export interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  theme?: 'default' | 'danger' | 'inverse';
  onClick?: () => void;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  if (props.theme == "default") {
    return (
      <DefaultButton
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}>
        {props.children}
      </DefaultButton>
    );
  }

  if (props.theme == "inverse") {
    return (
      <InverseButton type={'button'}>
        {props.children}
      </InverseButton>
    );
  }

  return (
    <DefaultButton
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}>
      {props.children}
    </DefaultButton>
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
