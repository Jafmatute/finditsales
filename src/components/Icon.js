import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const Icon = (props) => {
  const {icons, securePassword, check} = props;
  switch (icons) {
    case 'password':
      if (securePassword) {
        return <Feather name="eye-off" color="grey" size={20} />;
      } else {
        return <Feather name="eye" color="grey" size={20} />;
      }
      break;
    case 'check':
      return check ? (
        <Feather name="check-circle" color="green" size={20} />
      ) : null;
      break;
    case 'email':
      return <Feather name="mail" color="grey" size={20} />;
      break;
    case 'phone':
      return <Feather name="phone" color="grey" size={20} />;
      break;
    case 'contact':
      return <Feather name="info" color="grey" size={20} />;
      break;
    default:
      return null;
  }
};

export default Icon;
