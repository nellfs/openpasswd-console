import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../../atoms';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useRecoilValue(auth_token);
  const location = useLocation();

  if (token) {
    const claims = JSON.parse(atob(token.split('.')[1]));

    if (Date.now() < claims.exp * 1000) {
      return children;
    }
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}
