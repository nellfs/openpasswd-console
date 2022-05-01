import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
import { Button } from '../../components/Button';
import { Form, Input } from '../../components/Form';
import { authRegister, authToken } from '../../services';
import { ResponseError, ResponseToken } from '../../services/models';

interface IState {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

type ErrorProps = {
  field: string;
  value: string;
};

const ErrorMessage = (props: ErrorProps) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 rounded relative"
    role="alert"
  >
    <span className="block sm:inline">{props.value}</span>
  </div>
);

const Register = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<IState>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [_, setToken] = useRecoilState(auth_token);
  const [errors, setErrors] = useState<ResponseError>();
  const [isLoading, setIsLoading] = useState(false);

  const authRegisterRequest = async () => {
    setIsLoading(true);

    const result = await authRegister(state);
    if (typeof result === 'number') {
      // login
      setErrors(undefined);
      let login = await authToken(state);
      if ('access_token' in login) {
        setToken((login as ResponseToken).access_token);
        navigate('/', { replace: true });
      } else {
        setErrors(login as ResponseError);
      }
    } else {
      setErrors(result as ResponseError);
    }
    setIsLoading(false);
  };

  let errorMessages;
  if (errors) {
    errorMessages = Object.keys(errors?.error).map((k) => {
      let v = errors?.error[k];
      return <ErrorMessage key={k} field={k} value={v} />;
    });
  }
  return (
    <main className="flex-grow flex justify-center">
      <div className="py-12 px-5 container md:w-1/2">
        <h2 className="text-2xl font-bold">Register</h2>
        <div className="mt-8">
          <Form onSubmit={authRegisterRequest}>
            <div className="grid grid-cols-1 gap-6">
              {errorMessages}
              <Input
                name="Full Name"
                type="text"
                value={state.name}
                onChange={(value) => setState({ ...state, name: value })}
              />
              <Input
                name="Email"
                type="email"
                placeholder="john@example.com"
                value={state.email}
                onChange={(value) => setState({ ...state, email: value })}
              />
              <Input
                name="Password"
                type="password"
                placeholder="********"
                value={state.password}
                onChange={(value) => setState({ ...state, password: value })}
              />
              <Input
                name="Password Confirmation"
                type="password"
                placeholder="********"
                value={state.passwordConfirmation}
                onChange={(value) =>
                  setState({ ...state, passwordConfirmation: value })
                }
              />
              <div className="block">
                <div className="mt-2">
                  <div className="flex justify-between">
                    <Link className="text-blue-600 hover:underline" to="/login">
                      Already have an account
                    </Link>
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isLoading}>
                Register Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Register;
