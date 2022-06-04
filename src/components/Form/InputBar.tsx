import { PencilAltIcon, MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { PropsWithChildren, useState } from 'react';

export interface Inputs<T> {
  type: 'text' | 'password' | 'email';
  name: string;
  canHide?: boolean;
  value: T;
  onChange: (v: T) => void;

}

function AutoIcon(props: { type: string; }) {
  if (props.type === 'email') {
    return <MailIcon className="h-6" />
  } else if (props.type === 'password') {
    return <LockClosedIcon className="h-6" />
  }
  return <PencilAltIcon className="h-6" />
}

function ShowIcon(props: { type: boolean }) {
  if (props.type === false) {
    return <EyeIcon className='text-blue-400 h-6' />
  } else if (props.type === true) {
    return <EyeOffIcon className='text-slate-300 h-6' />
  }
  return <div>{props.type}</div>
}

export default function InputBar<T extends string | number>(props: PropsWithChildren<Inputs<T>>) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  if (props.canHide) {
    return (
      <label className="block relative">
        <div className='flex flex-row'>
          <div className='absolute ml-2 mt-2 text-slate-300'>
            {<AutoIcon type={props.type} />}
          </div>
          <input
            type={passwordShown ? "text" : "password"}
            className="
          mb-3
          block
          border-0
          w-full
          rounded-lg
          bg-slate-100 
          text-slate-800 
          placeholder-slate-400
          pl-9"
            placeholder={props.name}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value as T)}
          />

          <button type="button" className='ml-[88%] m-2 absolute font-others' onClick={togglePassword}>
            <ShowIcon type={passwordShown}></ShowIcon>
          </button>
        </div>
      </label>
    )
  }
  return (
    <label >
      <div className='flex flex-row'>
        <div className='absolute ml-2 mt-2 text-slate-300'>
          {<AutoIcon type={props.type}></AutoIcon>}
        </div>
        <input
          type={props.type}
          className="
    mb-3
    block
    border-0
    w-full
    rounded-lg
    bg-slate-100 
    text-slate-800 
    placeholder-slate-400
    pl-9"
          placeholder={props.name}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value as T)}
        />
      </div>
    </label>

  )

}