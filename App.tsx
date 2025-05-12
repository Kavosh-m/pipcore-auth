import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardPage from './src/screens/Dashboard/dasboard-page';
import LoginPage from './src/screens/Auth/login-page';
import {SignInProvider} from './src/state/auth-provider';
import {SignInContext} from './src/state/auth-context';
import Splash from './src/screens/Splash/splash';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {isSignedIn} = React.useContext(SignInContext);

  return (
    <Stack.Navigator>
      {isSignedIn == null ? (
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
      ) : isSignedIn ? (
        <Stack.Screen name="Home" component={DashboardPage} />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SignInProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SignInProvider>
  );
}
