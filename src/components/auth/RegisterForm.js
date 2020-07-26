import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
//import firebase
import firebase from '../../utils/firebase';
//Component
import {InputText} from '../Input';
//función de validación
import {validateEmail} from '../../utils/Validation';
//context
import {AuthContext} from '../../context/authContext';

export default function RegisterForm(props) {
  const [formRegister, setFormRegister] = useState(defaultForm);
  const {toasRef} = props;
  const {signUp} = useContext(AuthContext);

  const onChange_text = (e, type) => {
    setFormRegister({...formRegister, [type]: e.nativeEvent.text});
  };

  const onSubmitRegister = () => {
    const {email, password, repeatPassword} = formRegister;

    if (!email || !password || !repeatPassword) {
      toasRef.current.show('Los campos son obligatorios', 2000);
    } else if (
      email.length < 6 ||
      password.length < 6 ||
      repeatPassword.length < 6
    ) {
      toasRef.current.show('Por favor, revise la logitud de los campos', 2000);
    } else if (!validateEmail(email)) {
      toasRef.current.show('Correo electronico invalido.', 2000);
    } else if (password !== repeatPassword) {
      toasRef.current.show('Las contraseñas no coinciden.', 2000);
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          //console.log('Register account', response);
          signUp(response);
        })
        .catch((error) => {
          let msj = error.message;
          if (
            msj === 'The email address is already in use by another account.'
          ) {
            console.log(error);
            toasRef.current.show(
              'El email que ingreso ya se encuentra asociado al sistema',
              4000,
            );
          } else {
            toasRef.current.show('Error al crear tu cuenta', 2000);
          }
        });
    }
  };
  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Crea tu Cuenta</Text>
        <View>
          <InputText
            placeholder={'Correo Electronico'}
            text={'email'}
            onChange={onChange_text}
            icon={'check'}
            //onChangeText={onChange_check}
            //check={check}
          />
          <InputText
            secureTextEntry
            icon={'password'}
            placeholder={'Contraseña'}
            text={'password'}
            onChange={onChange_text}
          />
          <InputText
            secureTextEntry
            icon={'password'}
            placeholder={'Repetir Contraseña'}
            text={'repeatPassword'}
            onChange={onChange_text}
          />
        </View>
        <View style={styles.forgotContainer}></View>

        <TouchableOpacity style={styles.btnRegister} onPress={onSubmitRegister}>
          <Text style={[styles.btnTextForgot, {color: 'white'}]}>
            Regístrarme
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
function defaultForm() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  };
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
  btnRegister: {
    paddingTop: 20,
    backgroundColor: '#8e459e',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ggBtn: {
    flexDirection: 'row',
  },
});
