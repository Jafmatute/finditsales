import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {useTheme, Avatar} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import component
import {InputText} from '../Input';
import {renderHeader, renderInner} from '../account/BottomSheet';
import AvatarText from './AvatarText';

export default function EditForm(props) {
  const {toasRef, userInfo} = props;
  //console.log('EDIT FO5M', userInfo.email);
  const [image, setImage] = useState('');
  const [formUserEdit, setFormUserEdit] = useState(defaultForm);
  const [userInfo_, setUserInfo_] = useState(JSON.parse(userInfo));
  //obtener los datos de los text
  const onChange_text = (e, type) => {
    setFormUserEdit({...formUserEdit, [type]: e.nativeEvent.text});
  };

  //subida de imagenes
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then((img) => {
        setImage(img.path);
        bs.current.snapTo(1);
      })
      .catch((error) => {
        if (error.message == 'User cancelled image selection') {
          toasRef.current.show('Cancelo la acción de subir foto', 3000);
        }
      });
  };

  const choosePhotoFromLibrery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then((img) => {
        console.log('librery', img);
        setImage(img.path);
        bs.current.snapTo(1);
      })
      .catch((error) => {
        if (error.message == 'User cancelled image selection') {
          toasRef.current.show('Cancelo la acción de subir foto', 3000);
        }
      });
  };

  //enviar datos a firebase
  const onSubmitEditProfile = () => {
    const {name, city, biography} = formUserEdit;
    if (!name || !city || !biography) {
      toasRef.current.show('Ingrese la información de los campos', 3000);
    } else if (name.length < 6 || city.length < 6 || biography.length < 6) {
      toasRef.current.show('Por favor, revise la logitud de los campos', 2000);
    } else {
    }
  };
  const bs = useRef();
  const fall = new Animated.Value(1);
  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        initialSnap={1}
        renderHeader={renderHeader}
        renderContent={() =>
          renderInner(bs, choosePhotoFromLibrery, takePhotoFromCamera)
        }
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View style={styles.container}>
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.2, Animated.multiply(fall, 1.0)),
          }}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View style={styles.viewImageBackground}>
                {!image ? (
                  <>
                    <AvatarText size={100} />

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
                    imageStyle={{borderRadius: 50}}>
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
            <Text style={styles.userInfo}>{userInfo_.email}</Text>
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
    </>
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
  userInfo: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
