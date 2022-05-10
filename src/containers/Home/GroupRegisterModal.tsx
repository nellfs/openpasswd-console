import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
import { Button } from '../../components/Button';
import { Form, Input } from '../../components/Form';
import FormErrorView from '../../components/Form/ErrorMessage';
import { ModalPanel } from '../../components/Modal';
import OpenPasswdClient from '../../services';
import { ResponseError } from '../../services/models';

export interface GroupRegisterModalProps {
  visible: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export default function GroupRegisterModal(props: GroupRegisterModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>('');
  const [errors, setErrors] = useState<ResponseError>();
  const [token, setToken] = useRecoilState(auth_token);

  const onClose = () => {
    setName('');
    props.onClose();
  };

  const onSubmit = async () => {
    setIsLoading(true);

    const openPasswdClient = new OpenPasswdClient(token, setToken);
    try {
      await openPasswdClient.createAccountGroup(name);
      props.onComplete();
      onClose();
    } catch (e) {
      if (e instanceof ResponseError) {
        setErrors(e);
      } else {
        console.log(`Exception: ${e}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalPanel visible={props.visible} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-8">Create Group</h2>
      <Form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <FormErrorView responseError={errors} />
          <Input
            name="Name"
            type="text"
            value={name}
            onChange={(value) => setName(value)}
          />
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </Form>
    </ModalPanel>
  );
}
