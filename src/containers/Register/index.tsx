import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
import { Button } from '../../components/Button';
import { Form, Input } from '../../components/Form';
import FormErrorView from '../../components/Form/ErrorMessage';
import OpenPasswdClient from '../../services';
import { ResponseError } from '../../services/models';

interface RegisterState {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterState>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const setToken = useRecoilState(auth_token)[1];
  const [errors, setErrors] = useState<ResponseError>();
  const [isLoading, setIsLoading] = useState(false);

  const authRegisterRequest = async () => {
    setIsLoading(true);

    const openPasswdClient = new OpenPasswdClient(undefined, setToken);
    try {
      await openPasswdClient.authRegister(state);
      const login = await openPasswdClient.authToken(state);
      setToken(login.access_token);
      navigate('/', { replace: true });
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
    <main className="flex-grow flex justify-center">
      <div className="py-12 px-5 container md:w-1/2">
        <h2 className="text-2xl font-bold">Register</h2>
        <div className="mt-8">
          <Form onSubmit={authRegisterRequest}>
            <div className="grid grid-cols-1 gap-6">
              <FormErrorView responseError={errors} />
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
