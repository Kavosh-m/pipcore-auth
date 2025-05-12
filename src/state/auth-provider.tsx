import {mmkvStorage} from '../storage/local';
import {SignInContext} from './auth-context';
import * as React from 'react';

export const SignInProvider = ({children}: {children: React.ReactNode}) => {
  const [isSignedIn, setIsSignedIn] = React.useState<null | boolean>(null);

  const signIn = () => {
    setIsSignedIn((mmkvStorage.getString('accessToken') ?? '').length > 1);
  };

  const signOut = () => {
    setIsSignedIn((mmkvStorage.getString('accessToken') ?? '').length > 1);
  };

  React.useEffect(() => {
    const token = mmkvStorage.getString('accessToken');
    if (!token) {
      setIsSignedIn(false);
    } else {
      setIsSignedIn(token.length > 1);
    }
  }, []);

  return (
    <SignInContext.Provider value={{isSignedIn, signIn, signOut}}>
      {children}
    </SignInContext.Provider>
  );
};
