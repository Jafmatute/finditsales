import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//import firebase
import firebase from '../../utils/firebase';
import 'firebase/auth';
//components
import {InputText} from '../Input';
//function validation
import {validateEmail} from '../../utils/Validation';
//custom
import AuthStyle from '../../customs/AuthScreenStyles';

//context
import {AuthContext} from '../../context/authContext';

export default function LoginForm(props) {
  const {navigation, toasRef} = props;
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const {signIn} = useContext(AuthContext);

  const onChange_text = (e, type) => {
    setFormLogin({...formLogin, [type]: e.nativeEvent.text});
  };

  const onSubmitLogin = () => {
    const {email, password} = formLogin;
    if (!email || !password) {
      toasRef.current.show('Por favor, ingrese información', 3000);
    } else if (email.length < 6 || password.length < 6) {
      toasRef.current.show(
        'Por favor, revise la longitud de los caracteres',
        3000,
      );
    } else if (!validateEmail(email)) {
      toasRef.current.show('Por favor, ingrese un correo válido', 3000);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          //console.log('RESPUEST', response);
          signIn(response);
        })
        .catch((error) => {
          if (error) {
            toasRef.current.show('Contraseña ó correo incorrecto.', 3000);
          }
          console.log('RESPUEST', error);
        });
    }
  };
  return (
    <>
      <View style={AuthStyle.wrapper}>
        <Text style={AuthStyle.header}>Iniciar Sesión</Text>
        <View>
          <InputText
            title={'Correo Electronico'}
            text={'email'}
            onChange={onChange_text}
          />
          <InputText
            secureTextEntry
            title={'Contraseña'}
            icon={'password'}
            text={'password'}
            onChange={onChange_text}
          />
        </View>

        <View style={AuthStyle.forgotContainer}>
          <TouchableOpacity>
            <Text style={AuthStyle.btnTextForgot}>Recuperar contraseña ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onSubmitLogin} style={AuthStyle.btn}>
          <Text style={[AuthStyle.btnTextForgot, {color: 'white'}]}>
            Entrar
          </Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', padding: 20}}>or</Text>
        <View style={AuthStyle.ggBtn}></View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Todavía no eres miembro,</Text>
          <TouchableOpacity onPress={() => navigation.navigate('subscribe')}>
            <Text style={[AuthStyle.btnTextForgot, {color: '#007dd7'}]}>
              Suscribete.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
