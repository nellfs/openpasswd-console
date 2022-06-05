import { PencilAltIcon, MailIcon, LockClosedIcon } from '@heroicons/react/outline'
import { PropsWithChildren } from 'react';

interface Inputs<T> {
  type: 'text' | 'password' | 'email';
  name: string;
  value: T;
  onChange: (value: T) => void;
}

function AutoIcon(props: { type: string; }) {
  if (props.type === 'email')
    return <MailIcon className="h-6" />
  else if (props.type === 'password')
    return <LockClosedIcon className="h-6" />
  return <PencilAltIcon className="h-6" />
}

export default function InputBar<T extends string | number>(props: PropsWithChildren<Inputs<T>>) {
  return (
    <label>
      <div className='flex flex-row'>
        <div className='absolute ml-2 mt-2 text-slate-300'>
          {<AutoIcon type={props.type}></AutoIcon>}
        </div>
        <input
          type={props.type}
          placeholder={props.name}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value as T)}
          className="
            mb-3
            block
            border-0
            w-full
            rounded-lg
          bg-slate-100 
          text-slate-800 
          placeholder-slate-400
            pl-9"/>
      </div>
    </label>
  )
}