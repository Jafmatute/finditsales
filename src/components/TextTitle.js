import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TextTitle = ({style, children, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

export default TextTitle;

const styles = StyleSheet.create({
  text: {
    color: '#222',
  },
});
