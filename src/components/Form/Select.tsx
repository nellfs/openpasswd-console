export interface SelectProps {
  name: string;
  value: string;
  options: { [key: string]: string };
  onChange: (value: string) => void;
}

export default function Select(props: SelectProps) {
  const options = Object.keys(props.options).map((k) => (
    <option key={k} value={k}>
      {props.options[k]}
    </option>
  ));
  return (
    <label className="block">
      <span className="text-gray-700">{props.name}</span>
      <select
        className="
              block
              w-full
              mt-1
              rounded-md
              bg-gray-100
              border-transparent
              focus:border-gray-500 focus:bg-white focus:ring-0
            "
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {options}
      </select>
    </label>
  );
}
