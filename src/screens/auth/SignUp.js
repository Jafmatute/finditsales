import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

//componentes
import {InputText} from '../../components/auth/Input';

export default function SignUp({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Registrarse</Text>
        <View>
          <InputText placeholder={'Correo Electronico'} icon={'check'} />
          <InputText
            secureTextEntry
            icon={'password'}
            placeholder={'Contraseña'}
          />
          <InputText
            secureTextEntry
            icon={'password'}
            placeholder={'Repetir Contraseña'}
          />
        </View>
        <View style={styles.forgotContainer}></View>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={[styles.btnTextForgot, {color: 'white'}]}>
            Regístrarme
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
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
