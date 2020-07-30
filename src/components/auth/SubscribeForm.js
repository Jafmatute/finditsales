import React, {useState, useRef, createRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
//component
import {InputText} from '../Input';
//custom
import AuthStyle from '../../customs/AuthScreenStyles';

export default function SubscribeForm(props) {
  const {toasRef} = props;
  const [formSubscribe, setFormSubscribe] = useState(formDefault);
  const [scrollview, SetScrollview] = useState(false);
  const [scroll, setScroll] = useState(0);

  const scrollviewDown = useRef();

  const onChange_text = (e, type) => {
    setFormSubscribe({
      ...formSubscribe,
      [type]: e.nativeEvent.text,
    });
  };
  const onSubmitSubscribe = () => {
    const {business, rtn, email, phone, contact} = formSubscribe;
    if (!business || !rtn || !email || !phone || !contact) {
      toasRef.current.show(
        'Debe ingresar toda la información de los campos',
        3000,
      );
    } else if (
      business.length < 6 ||
      rtn.length < 6 ||
      email.length < 6 ||
      phone.length < 6 ||
      contact.length < 6
    ) {
      toasRef.current.show('Revise la longitud de los campos', 3000);
    } else {
    }
  };

  const scrollBottom = (animated = true) => {
    if (!!scroll) {
      let scrollResponder = scrollviewDown.current.getScrollResponder();
      scrollResponder.scrollResponderScrollTo({
        x: 0,
        y: scroll,
        animated: true,
      });
    }
    SetScrollview(!scrollview);
  };

  const scrollBottomUp = () => {
    SetScrollview(!scrollview);
    return scrollviewDown.current.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <>
      <View style={AuthStyle.wrapper}>
        <Text style={[AuthStyle.header]}>{'Suscripción findit'}</Text>
        <ScrollView
          ref={scrollviewDown}
          onLayout={(event) => {
            var {y} = event.nativeEvent.layout;
            setScroll(y);
          }}>
          <View>
            <InputText
              title={'Nombre de la empresa'}
              text={'business'}
              onChange={onChange_text}
            />
            <InputText title={'RTN'} text={'rtn'} onChange={onChange_text} />
            <InputText
              title={'Correo empresa'}
              text={'email'}
              icon={'email'}
              onChange={onChange_text}
            />
            <InputText
              title={'Teléfono'}
              text={'phone'}
              icon={'phone'}
              onChange={onChange_text}
            />
            <InputText
              title={'Contacto'}
              text={'contact'}
              icon={'contact'}
              onChange={onChange_text}
            />
          </View>
        </ScrollView>
        <View style={{marginLeft: 170}}>
          {!scrollview ? (
            <Feather
              name="arrow-down"
              size={30}
              color="grey"
              onPress={scrollBottom}
            />
          ) : (
            <Feather
              name="arrow-up"
              size={30}
              color="grey"
              onPress={scrollBottomUp}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={onSubmitSubscribe}
          style={[AuthStyle.btn, {marginTop: 30}]}>
          <Text style={[AuthStyle.btnTextForgot, {color: 'white'}]}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
function formDefault() {
  return {
    business: '',
    rtn: '',
    email: '',
    phone: '',
    contact: '',
  };
}
