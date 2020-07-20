import React from 'react';
import {Provider as PaperProvider, Avatar, Button} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Text>Findit sales!</Text>
          <Avatar.Text size={24} label="XD" />
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Press me
          </Button>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
