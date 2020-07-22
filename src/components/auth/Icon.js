import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const Icon = (props) => {
  const {icons, securePassword} = props;
  switch (icons) {
    case 'password':
      if (securePassword) {
        return <Feather name="eye-off" color="grey" size={20} />;
      } else {
        return <Feather name="eye" color="grey" size={20} />;
      }
    case 'check':
      return <Feather name="check-circle" color="green" size={20} />;
    default:
      return null;
  }
};

export default Icon;
