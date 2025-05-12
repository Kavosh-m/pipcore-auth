import * as React from 'react';
import {mmkvStorage} from '../storage/local';

export const SignInContext = React.createContext({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
});
