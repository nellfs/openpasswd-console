import HiddenInputBar from './HiddenInputBar';
import InputBar from './InputBar'
export interface InputProps<T> {
  type: 'text' | 'password' | 'email';
  name: string;
  canHide: boolean;
  value: T;
  onChange: (value: T) => void;
}

export default function Input<T extends string | number>(props: InputProps<T>) {
  if (props.canHide)
    return (<HiddenInputBar type={props.type} name={props.name} value={props.value} onChange={props.onChange} />)
  return (<InputBar type={props.type} name={props.name} value={props.value} onChange={props.onChange} />)
}