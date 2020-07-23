import React from 'react';
import {LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Main from './src/screens/Main';

/*LogBox.ignoreWarnings([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);*/

function App() {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}

export default App;
