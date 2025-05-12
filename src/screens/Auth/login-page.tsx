import {Button} from '@react-navigation/elements';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native';
import {useLogin} from '../../api/api-service';
import {mmkvStorage} from '../../storage/local';
import {SignInContext} from '../../state/auth-context';

export default function LoginPage() {
  const {signIn} = React.useContext(SignInContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {data, isSuccess, error, isLoading, login} = useLogin(email, password);

  var isFieldsEmpty = email.length == 0 || password.length == 0;

  useEffect(() => {
    if (isSuccess && data?.data) {
      console.log('Login successful:', JSON.stringify(data, null, 2));
      mmkvStorage.set('accessToken', data.data.accessToken);
      signIn();
    } else if (error) {
      console.error('Login failed:', error);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    console.log('Error:', error);

    if (error) {
      ToastAndroid.show('Login failed. try again', ToastAndroid.LONG);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={{width: '100%', paddingHorizontal: 24}}>
        <Text style={{marginBottom: 32, fontSize: 32}}>Login</Text>

        <Text style={{marginTop: 16}}>Email</Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor={'grey'}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={{marginTop: 16}}>Password</Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor={'grey'}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Button
          onPress={login}
          disabled={isLoading || isFieldsEmpty}
          style={{
            opacity: isLoading || isFieldsEmpty ? 0.4 : 1,
            marginTop: 44,
          }}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 54,
    paddingHorizontal: 16,
  },
});
