import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
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

  const onChanceName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, name: event.target.value });
  const onChanceEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, email: event.target.value });
  const onChancePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, password: event.target.value });
  const onChancePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setState({ ...state, passwordConfirmation: event.target.value });

  const authRegisterRequest = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
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
          <form onSubmit={authRegisterRequest}>
            <div className="grid grid-cols-1 gap-6">
              {errorMessages}
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input
                  type="text"
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder=""
                  value={state.name}
                  onChange={onChanceName}
                />
              </label>
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
                  onChange={onChanceEmail}
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
                  onChange={onChancePassword}
                />
              </label>
              <label className="hidden">
                <span className="text-gray-700">Password Confirmation</span>
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
                  value={state.passwordConfirmation}
                  onChange={onChancePasswordConfirmation}
                />
              </label>
              <div className="block">
                <div className="mt-2">
                  <div className="flex justify-between">
                    <Link className="text-blue-600 hover:underline" to="/login">
                      Already have an account
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
