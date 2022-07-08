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
          shadow
          px-7 py-1.5
          disabled:bg-slate-400
          font-others
          font-medium
          text-slate-200
          bg-white
          text-1xl leading  
          rounded-lg
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