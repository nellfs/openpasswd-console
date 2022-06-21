import { useState, useEffect } from 'react';
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
  remember: boolean;
}

interface LocationProps {
  state: {
    from: Location;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;

  const from = location.state?.from?.pathname || '/';

  const [state, setState] = useState<IState>({
    email: '',
    password: '',
    remember: false,
  });

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false)

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
    if (state.password.trim().length > 6) setPasswordIsValid(true);
    else setPasswordIsValid(false);
  }


  useEffect(() => {
    setFormIsValid(
      state.email.includes('@') && state.password.trim().length > 6
    )
    console.log(state.email + ".")
  }, [state.email, state.password]);


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
    <main className='flex min-h-screen bg-gradient-to-tl from-secure-blue to-cyan-500'>
      <FormErrorView responseError={errors} />
      <div className='flex flex-row justify-center m-auto items-center shadow-2xl rounded-2xl'>
        <div className='sm:w-96 sm:max-w-96 sm:max-h-[27rem] p-8 bg-white rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-2xl sm:rounded-tr-none sm:rounded-br-none'>
          <div className='hidden sm:inline-flex text-slate-800 h-8 font-body font-semibold'>
            <CubeIcon />
            <h1 className='text-3xl'>OpenPasswd</h1>
          </div>
          <div className='font-body text-slate-600'>
            <p className='flex flex-row justify-center text-4xl font-boldn mt-8'>
              Log in to continue.
            </p>

            <Form onSubmit={authTokenRequest}>
              <div className='mt-8 flex flex-col' />
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
              <div className='flex flex-row gap-12 mt-5 mb-7 justify-center'>
                <Checkbox
                  name="Remember-me"
                  value={state.remember}
                  onChange={(value) => setState({ ...state, remember: value })} />

                <Link className='text-1xl text-blue-600 font-body' to='/password_recovery' >Forgot password?</Link>

              </div>
              <Button theme="default" type="submit" disabled={!formIsValid || isLoading}>
                Login
              </Button>
            </Form>
          </div>
        </div>
        <div className='sm:w-72 sm:max-w-96 h-[430px] hidden sm:flex flex-col px-4 items-center justify-center m-auto rounded-tr-2xl rounded-br-2xl bg-gradient-to-b from-cyan-500 to-secure-blue'>
          <div className='font-others text-white text-center'>
            <h1 className='font-bold text-4xl'>{"We won't forget your passwords"}</h1>
            <p className='mt-8 text-lg'>{"Not have an account yet? Create now!"}</p>
          </div>
          <div className='flex flex-col items-center mt-6'>
            <Link className="text-2xl text-white  transition-all hover:text-[1.65rem] font-bold font-body underline"
              to="/register">Create account</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
