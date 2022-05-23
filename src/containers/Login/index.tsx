import { useState } from 'react';
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
    <main className='min-h-screen bg-gradient-to-b from-sky-500 to-blue-700'>
      <div className='flex flex-col min-h-screen'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 m-auto'>
          <div className='text-slate-800 h-8 flex flex-row font-body font-bold'>
            <CubeIcon></CubeIcon>
            <h1 className='text-3xl'>OpenPasswd</h1>
          </div>
          <div className='font-others text-slate-500'>
            <p className='flex flex-row justify-center text-2xl mt-10'>
              Log in to your account
            </p>
            <div className='mt-8 flex flex-col gap-1'>
              <Input
                name="Email"
                type="email"
                value={state.email}
                onChange={(value) => setState({ ...state, email: value })} />
              <Input
                name="Password"
                type="password"
                value={state.password}
                onChange={(value) => setState({ ...state, password: value })} />
            </div>
          </div>
        </div>
      </div>
    </main >
    // <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center min-h-screen bg-gradient-to-t from-blue-800 to-blue-500'>
    //   <div className='bg-white rounded-2xl shadow-2xl flex flex-row w-full rounded-tr-3xl rounded-br-3xl '>
    //     <div className='w-3/5 p-10 font-body pb-10'>
    //       <div className='text-left font-bold flex flex-row items-start pb-1'>
    //         <CubeIcon className='text-cyan-500 h-8'></CubeIcon>
    //         <span className='text-cyan-500 text-2xl'>OpenPasswd</span>
    //       </div>

    //       <p className='text-4xl text-slate-500 font-semibold py-10'>Get secure now.</p>
    //       <Form onSubmit={authTokenRequest}>
    //         <FormErrorView responseError={errors} />

    //         <Input
    //           name="Email"
    //           type="email"
    //           value={state.email}
    //           onChange={(value) => setState({ ...state, email: value })} />
    //         <Input
    //           name="Password"
    //           type="password"
    //           value={state.password}
    //           onChange={(value) => setState({ ...state, password: value })} />
    //         <div className='flex flex-col gap-3'>

    //           <Checkbox
    //             name="Remember-me"
    //             value={state.remember}
    //             onChange={(value) => setState({ ...state, remember: value })} />

    //           <Link className="text-blue-600 hover:underline"
    //             to="/register">Register new account</Link>

    //           <Button type="submit" disabled={isLoading}>
    //             Login
    //           </Button>
    //         </div>
    //       </Form>


    //     </div>
    //     <div className='w-2/5 bg-gradient-to-t from-blue-400 to-blue-400 text-white rounded-tr-2xl rounded-br-2xl'><p>a</p></div>
    //   </div>
    // </main>

  );
};

export default Login;
