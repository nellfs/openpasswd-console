import { PropsWithChildren } from 'react';

export interface LockedButton {
    type: 'submit' | 'reset' | 'button';
    onClick?: () => void;
}

function LockedButton(props: PropsWithChildren<LockedButton>) {
    return (

        <button
            className='
          inline-block
          px-7 py-3
          disabled:bg-slate-400
          font-others
          text-slate-200
          bg-white
          text-1xl leading uppercase 
          rounded-2xl
          cursor-not-allowed
          w-full'

            type={props.type}
            onClick={props.onClick}
            disabled
        >
            {props.children}
        </button>
    );
}

export default LockedButton;