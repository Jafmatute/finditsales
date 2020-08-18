import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {RadioButton, Text, Title, Avatar} from 'react-native-paper';
import firebase from '../../utils/firebase';
import 'firebase/firestore';
//component
import {InputText} from '../Input';
import logo from '../../assets/img/findit-1.png';
//custom
import offertStyle from '../../customs/OrderScreenStyles';

const db = firebase.firestore(firebase);
export default function OffertForm(props) {
  const [formOffert, setFormOffert] = useState(defaultForm());
  const [value, setValue] = useState('Original');
  const [uid, setUid] = useState();
  const [message, setMessage] = useState();
  const {toasRef, id, navigation} = props;

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    setUid(uid);
  }, []);

  const onChange_text = (e, type) => {
    setFormOffert({...formOffert, [type]: e.nativeEvent.text});
  };
  const obSubmitOffert = () => {
    const data = {
      ...formOffert,
      idOrder: id,
      uid: uid,
      product: value,
      estado: 'pendiente',
      createAt: new Date(),
    };
    const {price, brand, garant, product} = data;
    if (!product || !price || !brand || !garant) {
      toasRef.current.show('debe ingresar la información requerida', 2000);
    } else if (price.length < 0) {
      toasRef.current.show('Precio Vació.', 2000);
    } else if (brand.length < 4) {
      toasRef.current.show('Marca, debe tener mínimo 4 caracteres', 2000);
    } else if (garant.length < 5) {
      toasRef.current.show('Ingrese los días de garantía ó meses, años ', 2000);
    } else {
      setMessage('PROCESANDO OFERTA..');
      let ref = db.collection('Offert').doc(uid).collection('ofertas').doc();
      db.collection('Offert')
        .doc(uid)
        .set({...''});

      db.collection('Offert')
        .doc(uid)
        .collection('ofertas')
        .doc(ref.id)
        .set(data)
        .then((response) => {
          setMessage('GRACIAS, SU OFERTA FUE ENVIADA CON ÉXITO!');
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        })
        .catch((error) => {
          console.log('firebase offert', error);
        });
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={styles.viewFormOffert}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Avatar.Image source={logo} size={50} />
        <Title style={{fontWeight: 'bold', bottom: 10, top: 2}}>
          Findit Oferta
        </Title>
      </View>

      <View style={[offertStyle.viewCard, {justifyContent: 'space-around'}]}>
        <Text style={{top: 10, fontWeight: 'bold'}}>Seleccione</Text>
        <RadioButton.Group
          onValueChange={(value) => setValue(value)}
          value={value}>
          <View>
            <Text>Original</Text>
            <RadioButton value="Original" />
          </View>
          <View>
            <Text>Genérico</Text>
            <RadioButton value="Genérico" />
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.form}>
        <InputText
          title={'Precio a ofertar'}
          text={'price'}
          onChange={onChange_text}
          icon={'check'}
          is_valid={false}
          keyboardType={'numeric'}
        />

        <InputText
          title={'Marca'}
          text={'brand'}
          onChange={onChange_text}
          icon={'check'}
          is_valid={false}
        />
        <InputText
          title={'Garantia'}
          text={'garant'}
          onChange={onChange_text}
          icon={'check'}
          is_valid={false}
        />

        <TouchableOpacity onPress={obSubmitOffert} style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Enviar Oferta
          </Text>
        </TouchableOpacity>
        <Text style={styles.textFooter}>{message}</Text>
      </View>
    </ScrollView>
  );
}

function defaultForm() {
  return {
    price: '',
    brand: '',
    garant: '',
  };
}

const styles = StyleSheet.create({
  viewFormOffert: {
    margin: 20,
  },
  form: {
    borderRadius: 8,
    margin: 5,
    padding: 10,
    paddingBottom: 50,
    backgroundColor: '#fff',
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: {height: 0, width: 0},
  },
  textFooter: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    top: 40,
    color: 'green',
  },
  btn: {
    flex: 1,
    top: 10,
    backgroundColor: '#8e459e',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
