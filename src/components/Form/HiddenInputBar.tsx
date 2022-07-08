import { PencilAltIcon, LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { PropsWithChildren, useState } from 'react';

import InvalidInputBar from './InvalidInputBar'

interface Inputs<T> {
  type: 'text' | 'password' | 'email';
  name: string;
  value: T;
  isValid?: boolean;
  onBlur?: () => void;
  onChange: (value: T) => void;
}

function AutoIcon(props: { type: string; }) {
  if (props.type === 'password')
    return <LockClosedIcon className="h-6" />
  return <PencilAltIcon className="h-6" />
}

function ShowIcon(props: { type: boolean }) {
  if (props.type === false)
    return <EyeIcon className='text-secure-light-blue h-6' />
  else if (props.type === true)
    return <EyeOffIcon className='text-slate-300 h-6' />

  return <div>{props.type}</div>
}

export default function HiddenInputBar<T extends string | number>(props: PropsWithChildren<Inputs<T>>) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  return (
    <div className='flex flex-row'>
      <label className="block relative">
        <div className='flex flex-row'>

          <div className='absolute ml-2 mt-2  text-slate-300'>
            {<AutoIcon type={props.type}></AutoIcon>}
          </div>

          {props.isValid ?
            <input
              type={passwordShown ? "text" : "password"}
              placeholder={props.name}
              value={props.value}
              onBlur={props.onBlur}
              autoComplete="on"
              onChange={(event) => props.onChange(event.target.value as T)}
              className="
            mb-3
            block
            border-0
            w-[99%]
            rounded-2xl
          bg-slate-100 
          text-slate-800 
          placeholder-slate-400
            pl-9"/> :
            <div className='w-[99%]'>
              <InvalidInputBar type={props.type} name={props.name} value={props.value} isValid={props.isValid} onBlur={props.onBlur} onChange={props.onChange} />
            </div>
          }
        </div>
      </label>
      <button type="button" className='font-others h-10 w-10 rounded-full bg-slate-100' onClick={togglePassword}>
        <div className='flex m-auto justify-center items-center'>
          <ShowIcon type={passwordShown}></ShowIcon>
        </div>
      </button>
    </div>

  )
}