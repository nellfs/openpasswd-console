import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
import { Button } from '../../components/Button';
import { Checkbox, Form, Input } from '../../components/Form';
import { authToken } from '../../services';
import { ResponseError, ResponseToken } from '../../services/models';

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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;

  let from = location.state?.from?.pathname || '/';

  const [state, setState] = useState<IState>({
    email: '',
    password: '',
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ResponseError>();
  const [_, setToken] = useRecoilState(auth_token);

  const authTokenRequest = async () => {
    setIsLoading(true);
    let login = await authToken(state);
    if ('access_token' in login) {
      setToken((login as ResponseToken).access_token);
      navigate(from, { replace: true });
    } else {
      setErrors(login as ResponseError);
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
        <h2 className="text-2xl font-bold">Login</h2>
        <div className="mt-8">
          <Form onSubmit={authTokenRequest}>
            <div className="grid grid-cols-1 gap-6">
              {errorMessages}
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
              <div className="block">
                <div className="mt-2">
                  <div className="flex justify-between">
                    <Checkbox
                      name="Remember-me"
                      value={state.remember}
                      onChange={(value) =>
                        setState({ ...state, remember: value })
                      }
                    />
                    <Link
                      className="text-blue-600 hover:underline"
                      to="/register"
                    >
                      Register new account
                    </Link>
                  </div>
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;
