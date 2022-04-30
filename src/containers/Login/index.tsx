import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
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

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, email: event.target.value });
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, password: event.target.value });
  const onChangeRemember = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, remember: event.target.checked });

  const authTokenRequest = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    let login = await authToken(state);
    if ('access_token' in login) {
      setToken((login as ResponseToken).access_token);
      navigate('/', { replace: true });
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
          <form onSubmit={authTokenRequest}>
            <div className="grid grid-cols-1 gap-6">
              {errorMessages}
              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder="john@example.com"
                  value={state.email}
                  onChange={onChangeEmail}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Password</span>
                <input
                  type="password"
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder="********"
                  value={state.password}
                  onChange={onChangePassword}
                />
              </label>
              <div className="block">
                <div className="mt-2">
                  <div className="flex justify-between">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={state.remember}
                        onChange={onChangeRemember}
                      />
                      <span className="ml-2">Remember-me</span>
                    </label>
                    <Link
                      className="text-blue-600 hover:underline"
                      to="/register"
                    >
                      Register new account
                    </Link>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="
                  inline-block
                  px-7 py-3
                  disabled:bg-slate-600
                  bg-blue-600
                  text-white
                  font-medium text-sm leading-snug uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition duration-150 ease-in-out
                  w-full
                "
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
