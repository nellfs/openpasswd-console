import { useState } from 'react';
import { Form, Input } from '../../components/Form';
import { Button } from '../../components/Button';
import { ResponseError } from '../../services/models';
import OpenPasswdClient from '../../services';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
import { Link } from 'react-router-dom';

interface IState {
    email: string;
}

const ForgetPassword = () => {
    const [finalEmail, setFinalEmail] = useState('')
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
        setFinalEmail(state.email)
        if (state.email != "") setEmailWasSent(true)
        try {
            await openPasswdClient.recoveryPasswordRequest({
                ...state,
            });
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
            <div className="flex flex-col sm:bg-slate-200 min-h-screen">
                <div className="font-body flex flex-col h-screen sm:h-auto sm:w-72 justify-center items-center sm:m-auto bg-white p-4 sm:rounded-xl shadow-xl">
                    <div className='flex flex-col text-slate-500 items-center mb-2'>
                        <h1 className="text-center text-4xl text-slate-900 sm:text-2xl">
                            Forgot your password?
                        </h1>
                        <h2 className='\text-slate-700 font-medium text-2xl sm:text-lg'>
                            how embarrassing...
                        </h2>
                        <div className='mb-5 w-40 mt-1 bg-slate-200 py-px' />
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
                    <div className='w-full px-20 sm:px-1'>
                        <Button type={'submit'} onClick={() => "null"}>SEND EMAIL</Button>
                    </div>

                    {emailWasSent == true ?
                        <div className='flex flex-col items-center mt-6'>
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