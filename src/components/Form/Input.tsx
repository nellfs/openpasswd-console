export interface InputProps<T> {
  type: 'text' | 'password' | 'email';
  name: string;
  value: T;
  onChange: (v: T) => void;
}



export default function Input<T extends string | number>(props: InputProps<T>) {
  return (
    <label className="block relative">
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
          "
        placeholder={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as T)}
      />
    </label>
  );
}
