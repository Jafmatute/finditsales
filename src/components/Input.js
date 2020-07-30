import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from './Icon';

export const InputText = ({
  placeholder,
  secureTextEntry,
  title,
  icon,
  text,
  onChange,
  keyboardType,
  //check,
  //onChangeText,
}) => {
  const [securePassword, setSecurePassword] = useState(secureTextEntry);
  const [check, setCheck] = useState(false);
  const [isvalid, setIsValid] = useState(true);
  const onChange_check = (e) => {
    if (e.trim().length >= 6) {
      setCheck(true);
      setIsValid(true);
    } else {
      setCheck(false);
      setIsValid(false);
    }
  };

  //retornar nombres
  const Name = (nameIs) => {
    let name;
    switch (nameIs) {
      case 'email':
        return (name = 'Correo');
        break;
      case 'password':
        return (name = 'Contraseña');
        break;

      default:
        return (name = '');
        break;
    }
  };

  return (
    <>
      <Text style={[styles.title]}> {title ? title : ''} </Text>
      <View style={styles.action}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#007dd7"
          secureTextEntry={securePassword}
          style={styles.textInput}
          autoCapitalize="none"
          onChange={(e) => onChange(e, text)}
          onChangeText={(e) => onChange_check(e)}
          keyboardType={keyboardType}
        />

        {icon === 'password' ? (
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
            <Icon icons={icon} check={check} securePassword={securePassword} />
          </TouchableOpacity>
        ) : (
          <Icon icons={icon} check={check} />
        )}
      </View>
      {isvalid ? null : (
        <View>
          <Text style={styles.errorMsg}>{`${Name(
            text,
          )} debe tener 6 caracteres de longitud.`}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
  },
  title: {
    marginVertical: 10,
  },
  tex_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
