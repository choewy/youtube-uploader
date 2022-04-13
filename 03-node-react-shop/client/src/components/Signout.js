import { useEffect } from 'react';
import { signoutAction } from '../actions/user.actions';

const Signout = () => {
  useEffect(() => {
    const signout = async () => {
      await signoutAction();
      window.location.pathname = '/signin';
    };
    signout();
    return () => {};
  }, []);

  return <></>;
};

export default Signout;
