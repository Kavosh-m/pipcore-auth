import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from '@react-navigation/elements';
import {mmkvStorage} from '../../storage/local';
import {SignInContext} from '../../state/auth-context';

export default function DashboardPage() {
  const {signOut} = React.useContext(SignInContext);

  function handleLogout() {
    mmkvStorage.delete('accessToken');
    signOut();
  }

  return (
    <View style={styles.container}>
      <Text>DashboardPage</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
