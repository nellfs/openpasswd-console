import { PropsWithChildren } from 'react';

export interface FormProps {
  onSubmit: () => void;
}

export default function Form(props: PropsWithChildren<FormProps>) {
  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit();
  };

  return <form onSubmit={onSubmit}>{props.children}</form>;
}
