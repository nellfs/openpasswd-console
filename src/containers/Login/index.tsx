import { useState, useEffect, useReducer } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CubeIcon } from '@heroicons/react/outline'


import { auth_token } from '../../atoms';
import { Button } from '../../components/Button';
import { Checkbox, Form, Input } from '../../components/Form';
import FormErrorView from '../../components/Form/ErrorMessage';
import OpenPasswdClient from '../../services';
import { ResponseError } from '../../services/models';

interface IState {
  email: string;
  password: string;
}

interface LocationProps {
  state: {
    from: Location;
  };
}

const emailReducer = (state: IState, action) => {
  return { value: '', isValid: false };
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const from = location.state?.from?.pathname || '/';
  const [state, setState] = useState<IState>({ email: '', password: '', });


  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false)


  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: false });

  const emailChangeHandler = (value: string) => {
    setState({ ...state, email: value })
  };

  const passwordChangeHandler = (value: string) => {
    setState({ ...state, password: value });
  };

  const validateEmailHandler = () => {
    if (state.email.includes('@')) setEmailIsValid(true);
    else setEmailIsValid(false);
  }

  const validatePasswordHandler = () => {
    if (state.password.trim().length > 3) setPasswordIsValid(true);
    else setPasswordIsValid(false);
  }


  // useEffect(() => {
  //   setFormIsValid(
  //     state.email.includes('@') && state.password.trim().length > 3
  //   )
  // }, [state.email, state.password]);


  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ResponseError>();
  const setToken = useRecoilState(auth_token)[1];

  const authTokenRequest = async () => {
    setIsLoading(true);
    const openPasswdClient = new OpenPasswdClient(undefined, setToken);
    try {
      const login = await openPasswdClient.authToken(state);
      setToken(login.access_token);
      navigate(from, { replace: true });
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
    <main className='flex min-h-screen bg-secure-light-blue'>

      <div className='absolute inline-flex text-white m-2'>
        <CubeIcon className='h-7' />
        <h1 className='text-xl m-auto font-others font-semibold'>OpenPasswd</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-0 m-auto shadow-2xl grid-flow-col h-[28rem]'>
        <div className='font-body bg-white sm:rounded-tl-lg sm:rounded-bl-lg w-72 col-span-2 px-4'>
          <div className='flex flex-col px-1'>
            <h1 className='text-2xl mt-10 text-slate-700 font-bold'>
              Log in to continue.
            </h1>
            <h1 className='justify-center text-slate-500'>
              ready or not
            </h1>
            <div className='mt-8 w-full h-px bg-slate-200'></div>
          </div>
          <Form onSubmit={authTokenRequest}>
            <div className='mt-14 flex flex-col' />
            <Input
              name="Email"
              type="email"
              canHide={false}
              value={state.email}
              isValid={emailIsValid}
              onBlur={validateEmailHandler}
              onChange={(value) => emailChangeHandler(value)} />
            {/* print for test */}
            <Input
              name="Password"
              type="password"
              canHide={true}
              value={state.password}
              isValid={passwordIsValid}
              onBlur={validatePasswordHandler}
              onChange={(value) => passwordChangeHandler(value)}
            />
            <div className='px-1 gap-1 mb-3'>
              <Link className='text-1xl text-blue-600 font-body' to='/forgot_password' >Forgot password?</Link>
            </div>
            <div className='mt-10 p-3'>
              <Button theme="default" type="submit" disabled={!formIsValid || isLoading}>
                Login
              </Button>
            </div>
          </Form>
        </div>

        <div className='hidden sm:flex bg-blue-200 rounded-tr-lg rounded-br-lg w-[23rem]'>
          .
        </div>
      </div>



    </main>

  );

};

export default Login;
