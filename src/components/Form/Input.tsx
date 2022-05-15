export interface InputProps<T> {
  name: string;
  type: 'text' | 'password' | 'email';
  value: T;
  placeholder?: string;
  onChange: (v: T) => void;
}

export default function Input<T extends string | number>(props: InputProps<T>) {
  return (
    <label className="block">
      <span className="text-slate-600">{props.name}</span>
      <input
        type={props.type}
        className="
        mt-1
        block
        w-full
        rounded-md
        border-slate-200
        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
      "
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as T)}
      />
    </label>
  );
}
