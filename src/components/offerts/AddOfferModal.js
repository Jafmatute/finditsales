import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Title, Avatar, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import logo from '../../assets/img/findit-1.png';
import firebase from '../../utils/firebase';
//component
import {InputText} from '../Input';
//custom
import offertStyle from '../../customs/OrderScreenStyles';
export default function AddOfferModal(props) {
  const {closeModal, prices, setPrices} = props;

  const [formOffert, setFormOffert] = useState(defaultForm());
  const brands = ['Chino', 'Japones', 'Taiwanes', 'Otros'];
  const [uid, setUid] = useState();
  const [value, setValue] = useState('Chino');
  console.log('LOG', prices);
  useEffect(() => {
    const uid_firebase = firebase.auth().currentUser.uid;
    setUid(uid_firebase);
    //setPrices([{id: id, uid: uid, prices: []}]);
  }, []);
  function renderBrands() {
    //console.log(color);
    return brands.map((brand) => {
      return (
        <View style={styles.viewBrans} key={brand}>
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}>
            <View>
              <Text>{brand}</Text>
              <RadioButton value={brand} />
            </View>
          </RadioButton.Group>
        </View>
      );
    });
  }
  const onChange_text = (e, type) => {
    setFormOffert({...formOffert, [type]: e.nativeEvent.text});
  };

  const onSubmit = () => {
    const {price, garant} = formOffert;
    const pp = prices;
    console.log('ESTATE', prices);

    if (!pp.prices.some((p) => p.brand === value)) {
      const list = pp;
      list.prices.push({
        price: price,
        brand: value,
        garant: garant,
      });
      setPrices(list);
    }
  };
  console.log('CHECK BOX', prices);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Avatar.Image source={logo} size={50} />
        <Title style={{fontWeight: 'bold', bottom: 10, top: 2}}>
          Ingrese la oferta
        </Title>
      </View>
      <ScrollView horizontal>{renderBrands()}</ScrollView>

      <View style={styles.form}>
        <InputText title="precio" onChange={onChange_text} text={'price'} />
        <InputText title="Garantía" onChange={onChange_text} text={'garant'} />
        <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Enviar ofertas
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={offertStyle.btn} onPress={closeModal}>
        <Icon name="close" size={24} color="black" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

function defaultForm() {
  return {
    price: '',
    garant: '',
  };
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 100,
  },
  viewBrans: {
    flexDirection: 'row',
    borderRadius: 8,
    margin: 5,
    padding: 15,
    paddingBottom: 0,
    backgroundColor: '#fff',
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: {height: 0, width: 0},
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
