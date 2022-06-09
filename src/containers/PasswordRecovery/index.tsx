import { useState } from 'react';
import { Checkbox, Form, Input } from '../../components/Form';
import { EmojiSadIcon } from '@heroicons/react/outline'
import { Button } from '../../components/Button';

interface IState {
    email: string;
}


const PasswordRecovery = () => {
    const [state, setState] = useState<IState>({
        email: '',
    });

    return (
        <div className="flex flex-col sm:bg-slate-200 min-h-screen">
            <div className="font-body flex flex-col h-screen sm:h-auto sm:w-72 justify-center items-center sm:m-auto bg-white p-4 sm:rounded-xl shadow-xl">
                <div className='flex flex-col text-slate-500 items-center mb-2'>
                    <h1 className="text-center text-4xl text-slate-900 sm:text-2xl">
                        Forgot your password?
                    </h1>
                    {/* <EmojiSadIcon className='h-8 mb-4'></EmojiSadIcon> */}

                    <h2 className='\text-slate-700 font-medium text-2xl sm:text-lg'>
                        how embarrassing...
                    </h2>
                    <div className='mb-5 w-40 mt-1 bg-slate-200 py-px'>

                    </div>
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
                        onChange={(value) => setState({ ...state, email: value })} />
                </div>
                <div className='w-full px-20 sm:px-1'>
                    <Button type={'button'} >{'SEND EMAIL'}</Button>
                </div>
            </div>
        </div>
    )
}

export default PasswordRecovery;