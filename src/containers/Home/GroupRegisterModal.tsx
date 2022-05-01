import { useState } from 'react';
import { Button } from '../../components/Button';
import { Form, Input } from '../../components/Form';
import { ModalPanel } from '../../components/Modal';

export default function GroupRegisterModal(props: { visible: boolean }) {
  const [state, setState] = useState<{ name: string }>({
    name: '',
  });

  let errorMessages;

  return (
    <ModalPanel visible={props.visible} onClose={() => {}}>
      <h2 className="text-2xl font-bold mb-8">Login</h2>
      <Form onSubmit={() => {}}>
        <div className="grid grid-cols-1 gap-6">
          {errorMessages}
          <Input
            name="Email"
            type="email"
            placeholder="john@example.com"
            value={'email'}
            onChange={(value) => setState({ ...state, name: value })}
          />
          <Input
            name="Password"
            type="password"
            placeholder="********"
            value={'password'}
            onChange={(value) => setState({ ...state, name: value })}
          />
          <Button type="submit" disabled={false}>
            Login
          </Button>
        </div>
      </Form>
    </ModalPanel>
  );
}
