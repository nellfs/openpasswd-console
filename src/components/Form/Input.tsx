import { MailIcon, LockClosedIcon, PencilIcon } from '@heroicons/react/solid'
export interface InputProps<T> {
  type: 'text' | 'password' | 'email';
  name: string;
  value: T;
  onChange: (v: T) => void;
}

function AutoIcon(props: { isLoggedIn: string; }) {
  if (props.isLoggedIn === 'email') {
    return <MailIcon className="text-slate-300  pointer-events-none h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
  } else if (props.isLoggedIn === 'password') {
    return <LockClosedIcon className="text-slate-300  pointer-events-none h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
  }
  return <PencilIcon className="text-slate-300  pointer-events-none h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
}

export default function Input<T extends string | number>(props: InputProps<T>) {
  return (
    <label className="block relative">
      <AutoIcon isLoggedIn={props.type} />
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
          pl-11"
        placeholder={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as T)}
      />
    </label>
  );
}
