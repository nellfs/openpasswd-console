import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../../atoms';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useRecoilValue(auth_token);
  let location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
