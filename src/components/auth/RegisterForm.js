import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//Component
import {InputText} from './Input';

//función de validación
import {validateEmail} from '../../utils/Validation';

export default function RegisterForm(props) {
  const [formRegister, setFormRegister] = useState(defaultForm);
  const {toasRef} = props;

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
    backgroundColor: '#007dd7',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ggBtn: {
    flexDirection: 'row',
  },
});
