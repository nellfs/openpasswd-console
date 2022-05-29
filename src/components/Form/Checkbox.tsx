export interface CheckboxProps {
  name: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <label className="inline-block items-center">
      <input
        className="form-check-input appearance-none h-4 w-4 border border-slate-400 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-150 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
        type="checkbox"
        checked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <span className="ml-2" >{props.name}</span>
    </label>
  );
}
