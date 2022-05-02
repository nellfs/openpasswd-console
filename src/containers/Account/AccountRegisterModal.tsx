import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../../atoms';
import { Button } from '../../components/Button';
import { Form, Input } from '../../components/Form';
import FormErrorView from '../../components/Form/ErrorMessage';
import Select from '../../components/Form/Select';
import { ModalPanel } from '../../components/Modal';
import { createAccount, createAccountGroup } from '../../services/account';
import { NewAccount, ResponseError } from '../../services/models';

export interface AccountRegisterModalProps {
  visible: boolean;
  groupId: number;
  onComplete: () => void;
  onClose: () => void;
}

export default function AccountRegisterModal(props: AccountRegisterModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newAccount, setNewAccount] = useState<NewAccount>({
    name: '',
    level: 0,
    username: '',
    password: '',
    group_id: 0,
  });
  const [errors, setErrors] = useState<ResponseError>();
  const token = useRecoilValue(auth_token);
  const [level, setLevel] = useState(0);

  const onClose = () => {
    setNewAccount({
      name: '',
      level: 0,
      username: '',
      password: '',
      group_id: 0,
    });
    props.onClose();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    let result = await createAccount(token, {
      ...newAccount,
      group_id: props.groupId,
    });
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
      <h2 className="text-2xl font-bold mb-8">Create Account</h2>
      <Form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <FormErrorView responseError={errors} />
          <Input
            name="Name"
            type="text"
            value={newAccount.name}
            onChange={(value) => setNewAccount({ ...newAccount, name: value })}
          />
          <Input
            name="UserName"
            type="text"
            value={newAccount.username}
            onChange={(value) =>
              setNewAccount({ ...newAccount, username: value })
            }
          />
          <Input
            name="Password"
            type="password"
            placeholder="********"
            value={newAccount.password}
            onChange={(value) =>
              setNewAccount({ ...newAccount, password: value })
            }
          />
          <Select
            name="Level"
            value={`${newAccount.level}`}
            onChange={(value) =>
              setNewAccount({ ...newAccount, level: parseInt(value) })
            }
            options={{ '0': 'Open', '1': 'Soft', '2': 'Hard' }}
          />
          <Button type="submit" disabled={false}>
            Create
          </Button>
        </div>
      </Form>
    </ModalPanel>
  );
}
