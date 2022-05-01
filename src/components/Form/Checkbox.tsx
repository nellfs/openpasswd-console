export interface CheckboxProps {
  name: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        checked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <span className="ml-2">{props.name}</span>
    </label>
  );
}
