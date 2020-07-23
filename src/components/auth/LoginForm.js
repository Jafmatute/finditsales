import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//components
import {InputText} from './Input';

//function validation
import {validateEmail} from '../../utils/Validation';

export default function LoginForm(props) {
  const {navigation, toasRef} = props;
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

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
    }
  };
  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Iniciar Sesión</Text>
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

        <View style={styles.forgotContainer}>
          <TouchableOpacity>
            <Text style={styles.btnTextForgot}>Recuperar contraseña ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onSubmitLogin} style={styles.btnLogin}>
          <Text style={[styles.btnTextForgot, {color: 'white'}]}>Entrar</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', padding: 20}}>or</Text>
        <View style={styles.ggBtn}></View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Todavía no eres miembro,</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={[styles.btnTextForgot, {color: '#007dd7'}]}>
              Regístrate..
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#007dd7',
  },
  btnTextForgot: {
    fontWeight: 'bold',
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  btnLogin: {
    backgroundColor: '#007dd7',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ggBtn: {
    flexDirection: 'row',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
  },
});
