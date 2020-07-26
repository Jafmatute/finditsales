import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {useTheme, Avatar} from 'react-native-paper';
import Animated from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

//import component
import {InputText} from '../Input';

export default function EditForm(props) {
  const {email} = props;

  const [image, setImage] = useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );
  const [formUserEdit, setFormUserEdit] = useState(defaultForm);
  const onChange_text = (e, type) => {
    setFormUserEdit({...formUserEdit, [type]: e.nativeEvent.text});
  };

  const onSubmitEditProfile = () => {
    console.log('edit usuarios', formUserEdit);
  };

  bs = React.createRef();
  fall = new Animated.Value(1);
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.viewImageBackground}>
              {email ? (
                <>
                  <Avatar.Text
                    label={email.substr(0, 2).toUpperCase()}
                    size={70}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 15,
                    }}
                  />
                  <View style={styles.viewIconImage}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={[styles.iconImageBackground, {marginTop: -100}]}
                    />
                  </View>
                </>
              ) : (
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  <View style={styles.viewIconImage}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={styles.iconImageBackground}
                    />
                  </View>
                </ImageBackground>
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.userInfo}>{email}</Text>
        </View>

        <View>
          <InputText
            title={'Nombre Completo'}
            text={'name'}
            onChange={onChange_text}
            icon={'check'}
          />
          <InputText
            title={'Ciudad'}
            text={'city'}
            onChange={onChange_text}
            icon={'check'}
          />
          <InputText
            title={'Biografía'}
            text={'biography'}
            onChange={onChange_text}
            icon={'check'}
          />
        </View>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={onSubmitEditProfile}>
          <Text style={styles.panelButtonTitle}>Guardar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function defaultForm() {
  return {
    name: '',
    city: '',
    biography: '',
  };
}

const styles = StyleSheet.create({
  viewImageBackground: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIconImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImageBackground: {
    opacity: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },

  commandButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#8e459e',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  userInfo: {marginTop: 10, fontSize: 18, fontWeight: 'bold'},
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
