import { ResponseError } from '../../services/models';

export interface ErrorProps {
  field: string;
  value: string;
}

const ErrorMessage = (props: ErrorProps) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 rounded relative"
    role="alert"
  >
    <span className="block sm:inline">{props.value}</span>
  </div>
);

export interface FormErrorViewProps {
  responseError?: ResponseError;
}

export default function FormErrorView(props: FormErrorViewProps) {
  if (props.responseError) {
    const { error } = props.responseError!;
    let result = Object.keys(error).map((k) => {
      let v = error[k];
      return <ErrorMessage key={k} field={k} value={v} />;
    });
    return <>{result}</>;
  } else {
    return null;
  }
}
