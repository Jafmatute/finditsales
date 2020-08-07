import React from 'react';
import {LogBox, YellowBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {decode, encode} from 'base-64';
import Main from './src/screens/Main';

/*LogBox.ignoreWarnings([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);*/
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

YellowBox.ignoreWarnings(['Calling `getNode()`']);
YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);
YellowBox.ignoreWarnings([
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
]);

function App() {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}

export default App;
