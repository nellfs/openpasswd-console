import { useState } from 'react';
import OpenPasswdClient from "../../services";
import { useRecoilState } from "recoil";
import { auth_token } from '../../atoms';
import { Form, Input } from '../../components/Form';

interface IState {
    email: string;
}

const RecoveryPassword = () => {

    const setToken = useRecoilState(auth_token)[1];
    const [state, setState] = useState<IState>({ email: '' });


    const onSubmit = async () => {
        const openPasswdClient = new OpenPasswdClient(undefined, setToken)
        try {
            await openPasswdClient.recoveryPasswordRequest({
                ...state,
            });
        } catch (e) {
            console.log('error')
        } finally {
            console.log('loaded')
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Input
                name="Token"
                type="text"
                canHide={false}
                value={state.email}
                onChange={(value) => setState({ ...state, email: value })}
                isValid={true}
            />
            <Input
                name="Password"
                type="password"
                canHide={true}
                value={state.email}
                onChange={() => console.log('hello')}
                isValid={true}
            />
        </Form>
    )
}

export default RecoveryPassword;