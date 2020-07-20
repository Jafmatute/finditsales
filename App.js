import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Main from './src/screens/Main';

function App() {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}

export default App;
