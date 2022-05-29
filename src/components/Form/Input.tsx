import { PencilAltIcon, MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { useState } from 'react';
export interface InputProps<T> {
  type: 'text' | 'password' | 'email';
  name: string;
  canHide: boolean;
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
    return <EyeIcon className='relative text-sky-600 ml-2 h-8 m-1' />
  } else if (props.type === true) {
    return <EyeOffIcon className='relative text-slate-300 ml-2 h-8 m-1' />
  }
  return <div>{props.type}</div>
}

export default function Input<T extends string | number>(props: InputProps<T>) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  if (!props.canHide) {
    return (
      <label className="block relative">
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
    );
  }
  return (
    <label className="block relative">
      <div className='flex flex-row'>
        <div className='absolute ml-2 mt-2 text-slate-300'>
          {<AutoIcon type={props.type}></AutoIcon>}
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

        <button className='inline-flex font-others' onClick={togglePassword}>
          <ShowIcon type={passwordShown}></ShowIcon>
        </button>
      </div>
    </label>
  )
}
