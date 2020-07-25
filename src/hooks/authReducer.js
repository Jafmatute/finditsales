import React, {useReducer} from 'react';

export const dispatch_ = (type, uid, token) => {
  const initialLoginState = {
    isLoading: false,
    userToken: null,
    email: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          email: action.uid,
          isLoading: false,
        };

        break;
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          email: null,
          isLoading: false,
        };
        break;
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          email: action.uid,
          isLoading: false,
        };
        break;

      default:
        return loginState;
        break;
    }
  };
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  console.log(loginState, 'ok');
  return loginState;
};
