import { ResponseError } from '../../services/models';
import { ExclamationIcon } from '@heroicons/react/solid';

export interface ErrorProps {
  field: string;
  value: string;
}

const ErrorMessage = (props: ErrorProps) => (
  <div
    className="absolute top-8 flex mb-2 justify-center gap-6 shadow-lg font-body bg-red-500 text-white font-bold px-0 w-64 py-1 rounded-lg"
    role="alert"
  >
    <div className='flex'>
      <ExclamationIcon className='h-6' />
      <span className="inline-flex m-auto">{props.value}</span>
    </div>
  </div>
);

export interface FormErrorViewProps {
  responseError?: ResponseError;
}

export default function FormErrorView(props: FormErrorViewProps) {
  if (props.responseError) {
    const { error } = props.responseError;
    const result = Object.keys(error).map((k) => {
      const v = error[k];
      return <ErrorMessage key={k} field={k} value={v} />;
    });
    return <>{result}</>;
  } else {
    return null;
  }
}
