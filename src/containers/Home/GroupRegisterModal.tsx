import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../../atoms';
import { Button } from '../../components/Button';
import { Form, Input } from '../../components/Form';
import FormErrorView from '../../components/Form/ErrorMessage';
import { ModalPanel } from '../../components/Modal';
import { createAccountGroup } from '../../services/account';
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
  const token = useRecoilValue(auth_token);

  const onClose = () => {
    setName('');
    props.onClose();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    let result = await createAccountGroup(token, name);
    if ('id' in result) {
      props.onComplete();
      onClose();
    } else {
      setErrors(result as ResponseError);
    }
    setIsLoading(false);
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
          <Button type="submit" disabled={false}>
            Create
          </Button>
        </div>
      </Form>
    </ModalPanel>
  );
}
