import { useState, useEffect, useReducer, Reducer } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
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

interface AccountState {
  emailValue: string;
  emailIsValid: boolean;
  passwordValue: string;
  passwordIsValid: boolean;
}

const initialAccountState: AccountState = {
  emailValue: '',
  emailIsValid: true,
  passwordValue: '',
  passwordIsValid: true,
}

enum AccountActionTypes {
  EMAIL_USER_INPUT = 'EMAIL_USER_INPUT',
  EMAIL_USER_BLUR = 'EMAIL_USER_BLUR',
  PASSWORD_USER_INPUT = 'PASSWORD_USER_INPUT',
  PASSWORD_USER_BLUR = 'PASSWORD_USER_BLUR'
}

type AccountAction = {
  type: AccountActionTypes;
  emailVal: string;
  passwordVal: string;
}

interface LocationProps {
  state: {
    from: Location;
  };
}


function accountReducer(accountState: AccountState, accountAction: AccountAction) {
  const { type, emailVal, passwordVal } = accountAction;
  console.log(emailVal)
  switch (type) {

    case AccountActionTypes.EMAIL_USER_INPUT:
      return {
        emailValue: emailVal,
        emailIsValid: accountState.emailIsValid,
        passwordValue: '',
        passwordIsValid: true
      }
    case AccountActionTypes.EMAIL_USER_BLUR:
      console.log('hello')
      return {
        emailValue: accountAction.emailVal,
        emailIsValid: emailVal.includes('@'),
        passwordValue: '',
        passwordIsValid: true,
      }

    default:
      console.log('retornou')
      return accountState;

  }
  // if (type == 'USER_INPUT')
  //   return { value: action.val, isValid: state.isValid }
  // if (action.type === 'USER_BLUR') {
  //   console.log('validating in user_blur')
  //   return { value: state.value, isValid: action.val.includes('@') }
  // }
  // console.log('out')
  // console.log(state.value)
  // return { value: action.val, isValid: action.val.includes('@') };
}


export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const from = location.state?.from?.pathname || '/';


  // const [state, setState] = useState<IState>({ email: '', password: '', });
  // const [emailIsValid, setEmailIsValid] = useState(true);
  // const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false)

  const [accountState, dispatchAccountState] = useReducer(accountReducer, initialAccountState);

  const emailChangeHandler = (value: string) => {
    dispatchAccountState({
      type: AccountActionTypes.EMAIL_USER_INPUT,
      emailVal: value,
      passwordVal: ''
    })
  };

  const passwordChangeHandler = (value: string) => {
    dispatchAccountState({
      type: AccountActionTypes.PASSWORD_USER_INPUT,
      emailVal: '',
      passwordVal: value
    })
  };

  const validateEmailHandler = () => {
    dispatchAccountState({
      type: AccountActionTypes.EMAIL_USER_BLUR,
      emailVal: accountState.emailValue,
      passwordVal: ''
    })
  }

  const validatePasswordHandler = () => {
    dispatchAccountState({
      type: AccountActionTypes.PASSWORD_USER_BLUR,
      emailVal: '',
      passwordVal: accountState.passwordValue
    })
  }

  // const validateEmailHandler = () => {
  //   if (state.email.includes('@')) setEmailIsValid(true);
  //   else setEmailIsValid(false);
  // }

  // const validatePasswordHandler = () => {
  //   if (state.password.trim().length > 3) setPasswordIsValid(true);
  //   else setPasswordIsValid(false);
  // }

  const { emailIsValid: emailValid, passwordIsValid: passwordValid } = accountState;

  useEffect(() => {
    setFormIsValid(
      accountState.emailValue.includes('@') && accountState.passwordValue.trim().length > 7
    )
  }, [emailValid, passwordValid])




  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ResponseError>();
  const setToken = useRecoilState(auth_token)[1];

  const authTokenRequest = async () => {
    // setIsLoading(true);
    // const openPasswdClient = new OpenPasswdClient(undefined, setToken);
    // try {
    //   const login = await openPasswdClient.authToken(state);
    //   setToken(login.access_token);
    //   navigate(from, { replace: true });
    // } catch (e) {
    //   if (e instanceof ResponseError) {
    //     setErrors(e);
    //   } else {
    //     console.log(`Exception: ${e}`);
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
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
              Ready or not
            </h1>
            <div className='mt-8 w-full h-px bg-slate-200'></div>
          </div>
          <Form onSubmit={authTokenRequest}>
            <div className='mt-14 flex flex-col' />
            <Input
              name="Email"
              type="email"
              canHide={false}
              value={accountState.emailValue}
              isValid={accountState.emailIsValid}
              onBlur={validateEmailHandler}
              onChange={(value) => emailChangeHandler(value)} />
            {/* print for test */}
            <Input
              name="Password"
              type="password"
              canHide={true}
              value={accountState.passwordValue}
              isValid={accountState.passwordIsValid}
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

        <div className='hidden sm:flex bg-slate-300 rounded-tr-lg rounded-br-lg w-[23rem]'>
          .
        </div>
      </div>



    </main>

  );

};

export default Login;
