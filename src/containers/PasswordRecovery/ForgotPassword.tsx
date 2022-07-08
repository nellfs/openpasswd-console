import { useState } from 'react';
import { Form, Input } from '../../components/Form';
import { Button } from '../../components/Button';
import { ResponseError } from '../../services/models';
import OpenPasswdClient from '../../services';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
import { Link } from 'react-router-dom';
import FormErrorView from '../../components/Form/ErrorMessage';

interface IState {
    email: string;
}

const ForgetPassword = () => {
    const [emailStatus, setEmailStatus] = useState('Send Email')
    const [emailWasSent, setEmailWasSent] = useState(false)
    const [errors, setErrors] = useState<ResponseError>();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState<IState>({ email: '' });

    const setToken = useRecoilState(auth_token)[1];

    const sendRecoveryRequest = () => {
        console.log(state)
    }

    const onSubmit = async () => {
        const openPasswdClient = new OpenPasswdClient(undefined, setToken);
        setIsLoading(true);
        if (state.email != "") setEmailWasSent(true)
        try {
            await openPasswdClient.recoveryPasswordRequest({
                ...state,
            })
            setEmailStatus('Sended')
                ;
        } catch (e) {
            setEmailWasSent(true)
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
        <Form onSubmit={onSubmit}>
            <div className="flex flex-col min-h-screen bg-gradient-to-tr from-secure-blue to-cyan-500">
                <FormErrorView responseError={errors} />
                <div className="font-body flex flex-col h-screen sm:h-80 sm:w-72 justify-center items-center sm:m-auto bg-white p-4 sm:rounded-xl shadow-xl">
                    <div className='flex flex-col text-slate-500 items-center mb-2'>
                        <h1 className="text-center text-4xl text-slate-700 sm:text-2xl">
                            Forgot your password?
                        </h1>
                        <h2 className='text-slate-600 text-2xl sm:text-lg'>
                            how embarrassing...
                        </h2>
                        <div className='mb-5 w-40 bg-slate-200 py-px' />
                        <h3 className='text-center sm:w-64'>
                            Please enter your account email address, we will send you an message to change your password.
                        </h3>
                    </div>
                    <div className='w-full px-2 py-1'>
                        <Input
                            name="Email"
                            type="email"
                            canHide={false}
                            value={state.email}
                            onChange={(value) => setState({ ...state, email: value })}
                            isValid={true}
                        />
                    </div>

                    <div className='w-44 transition-all'>
                        <Button theme={'default'} type={'submit'} disabled={emailWasSent} onClick={() => "null"}>{emailStatus}</Button>
                    </div>

                    {emailWasSent == true ?
                        <div className='flex flex-col items-center mt-3'>
                            <Link className="text-1xl text-secure-blue font-bold font-body underline"
                                to="/recovery_password">I have a token</Link>
                        </div>
                        : null}
                </div>
            </div>
        </Form>
    )
}

export default ForgetPassword;