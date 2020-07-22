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
  onChangeText,
  title,
  icon,
  onPress,
}) => {
  const [securePassword, setSecurePassword] = useState(true);

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
          onChangeText={onChangeText}
        />

        {icon && (
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
            <Icon icons={icon} securePassword={securePassword} />
          </TouchableOpacity>
        )}
      </View>
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
});
