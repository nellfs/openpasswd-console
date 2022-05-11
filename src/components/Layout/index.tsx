import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
import OpenPasswdClient from '../../services';
import { ResponseError } from '../../services/models';

interface ILayoutProps {
  children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
  const [token, setToken] = useRecoilState(auth_token);

  const onClickLogout = async () => {
    const openPasswdClient = new OpenPasswdClient(token, setToken);
    try {
      await openPasswdClient.authLogout();
    } catch (e) {
      if (e instanceof ResponseError) {
        console.log(`ResponseError: ${e}`);
      } else {
        console.log(`Exception: ${e}`);
      }
    } finally {
      setToken(undefined);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800">
        <div className="px-6 md:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="text-2xl font-bold text-white" to="/">
              OpenPasswd
            </Link>
            <button
              type="button"
              className={classNames('text-xl font-bold text-white', {
                hidden: !token,
              })}
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {props.children}

      <footer className="min-w-full text-center lg:text-left bg-gray-100 text-gray-600">
        <div className="text-center p-6 bg-gray-200">
          <span>© 2022 Copyright:</span>
          <a
            className="text-gray-600 font-semibold"
            href="https://www.openpasswd.com/"
          >
            OpenPasswd
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
