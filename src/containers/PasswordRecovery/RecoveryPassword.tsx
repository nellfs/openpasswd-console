import { useEffect, useRef, useState } from 'react';
import OpenPasswdClient from "../../services";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth_token } from '../../atoms';
import { Form, Input } from '../../components/Form';
import { ResponseError } from '../../services/models';

import { Button } from '../../components/Button';
import FormErrorView from '../../components/Form/ErrorMessage';
interface validatePassword {
    newPassword: string
    newPasswordClone: string
}

interface newPasswordState {
    token: string;
    password: string
}

const RecoveryPassword = () => {
    const setToken = useRecoilState(auth_token)[1];
    const [state, setState] = useState<newPasswordState>({ password: '', token: '' });
    const [passwords, setPasswords] = useState<validatePassword>({ newPassword: '', newPasswordClone: '' })

    const [tokenIsValid, setTokenIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    const tokenValidateHandler = () => {
        console.log('tokenisvalid? ' + tokenIsValid)
        if (state.token.trim().length > 5)
            setTokenIsValid(true)
        else setTokenIsValid(false)
    }

    const passwordValidateHandler = () => {
        console.log('passwordisvalid? ' + passwordIsValid)
        if (passwords.newPassword == passwords.newPasswordClone && passwords.newPassword.trim().length > 4 && passwords.newPasswordClone.trim().length > 4) {
            console.log('password: ' + passwords.newPassword + ' /passwordclone: ' + passwords.newPasswordClone)
            setPasswordIsValid(true)
            state.password = passwords.newPassword
        }
        else setPasswordIsValid(false)
    }


    useEffect(() => {
        console.log('effecttoken is valid? ' + tokenIsValid + '|| effectpassword is valid? ' + passwordIsValid)
        setFormIsValid(passwords.newPassword == passwords.newPasswordClone && passwords.newPassword.trim().length > 4 && passwords.newPasswordClone.trim().length > 4 && state.token.trim().length > 5)

    }, [passwords.newPassword, passwords.newPasswordClone, state.token, state.password, tokenIsValid, passwordIsValid])

    const [errors, setErrors] = useState<ResponseError>();

    const onSubmit = async () => {
        const openPasswdClient = new OpenPasswdClient(undefined, setToken)
        try {
            await openPasswdClient.changePassword(state);
        } catch (e) {
            if (e instanceof ResponseError) {
                setErrors(e);
            } else {
                console.log(`Exception: ${e}`);
                console.log('error')
            }
        } finally {
            console.log('loaded')
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <FormErrorView responseError={errors} />
            <div className='flex flex-col min-h-screen bg-gradient-to-tr from-secure-blue to-cyan-500'>
                <div className='font-others flex flex-col h-screen sm:h-auto sm:w-82 justify-center items-center sm:m-auto bg-white p-4 sm:rounded-xl shadow-xl'>
                    <div className='flex flex-col text-slate-500 items-center mb-2'>
                        <h1 className="text-center text-4xl text-slate-700 sm:text-xl">
                            Check your email
                        </h1>
                        <div className='mb-5 w-40 mt-1 bg-slate-200 py-px' />
                    </div>
                    <div>
                        <Input
                            name="Token"
                            type="text"
                            canHide={false}
                            value={state.token}
                            onBlur={tokenValidateHandler}
                            onChange={(value) => setState({ ...state, token: value })}
                            isValid={tokenIsValid}
                        />
                        <Input
                            name="New password"
                            type="password"
                            value={passwords.newPassword}
                            canHide={true}
                            onBlur={passwordValidateHandler}
                            onChange={(value) => setPasswords({ ...passwords, newPassword: value })}
                            isValid={passwordIsValid}
                        />
                        <Input
                            name="Confirm new password"
                            type="password"
                            value={passwords.newPasswordClone}
                            canHide={true}
                            onBlur={passwordValidateHandler}
                            onChange={(value) => setPasswords({ ...passwords, newPasswordClone: value })}
                            isValid={passwordIsValid}
                        />
                    </div>
                    <div className='px-20 sm:px-1'>
                        <Button type={'submit'} theme={'default'} disabled={!formIsValid} onClick={() => "null"}>Send Password</Button>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default RecoveryPassword;