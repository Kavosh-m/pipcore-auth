import * as React from 'react';

type TC = {
  isSignedIn: null | boolean;
  signIn: () => void;
  signOut: () => void;
};

export const SignInContext = React.createContext<TC>({
  isSignedIn: null,
  signIn: () => {},
  signOut: () => {},
});
