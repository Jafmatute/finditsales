import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, Title, Avatar, RadioButton} from 'react-native-paper';
import firebase from '../../utils/firebase';
import 'firebase/firestore';
//component

import logo from '../../assets/img/findit-1.png';

const db = firebase.firestore(firebase);
export default function OffertForm(props) {
  const [formOffert, setFormOffert] = useState(defaultForm());
  const [state, setState] = useState(false);
  const brands = ['Chino', 'Japones', 'Taiwanés', 'Otros', 'America'];
  const [uid, setUid] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState();
  const [prices, setPrices] = useState({});
  const [value, setValue] = useState('Chino');
  const {toasRef, id, navigation, toasRefSuccess} = props;
  const inputPrice = useRef();
  const inputGarant = useRef();

  useEffect(() => {
    const uid_firebase = firebase.auth().currentUser.uid;
    setUid(uid_firebase);
    //setPrices([{id: id, uid: uid, prices: []}]);
    setPrices({prices: []});
  }, []);
  const onChange_text = (e, type) => {
    setFormOffert({...formOffert, [type]: e.nativeEvent.text});
  };

  function renderBrands() {
    //console.log(color);
    return brands.map((brand) => {
      return (
        <View style={styles.viewBrans} key={brand}>
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}>
            <View style={{alignItems: 'center'}}>
              <Text>{brand}</Text>
              <RadioButton value={brand} />
            </View>
          </RadioButton.Group>
        </View>
      );
    });
  }

  function renderOffert() {
    const pricesOffer = prices.prices;
    return (
      <FlatList
        data={pricesOffer}
        renderItem={(price) => <Offers list={price} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        extraData={state}
      />
    );
  }
  const Offers = ({list}) => {
    const {brand, garant, price} = list.item;
    const deleteTodo = (index) => {
      let item = prices;

      item.prices.splice(index, 1);
      setPrices(item);
      if (item.prices.length === 0) {
        setIsVisible(false);
      }

      setState(true);
      setState(false);
    };
    const alert = (index) => {
      Alert.alert(
        'Oferta',
        'Eliminar Oferta',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => deleteTodo(index)},
        ],
        {cancelable: false},
      );
    };
    return (
      <View>
        <TouchableOpacity
          style={[styles.listContainer, {backgroundColor: '#A7CBD9'}]}
          onPress={() => alert(list.index)}>
          <View style={{marginLeft: 5}}>
            <Text style={styles.listTitle} numberOfLines={1}>
              {brand}
            </Text>
            <Text style={styles.count}>{`${price} Lps`}</Text>
            <Text style={styles.subTitle}>{`La garantía es: ${garant}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onSubmitOffert = () => {
    const data = {
      ...prices,
      idOrder: id,
      uid: uid,
      estado: 'pendiente',
      createAt: new Date(),
      //prices: prices,
    };
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
          navigation.navigate('home');
        }, 2000);
      })
      .catch((error) => {
        console.log('firebase offert', error);
      });
    console.log('prices', prices);
  };
  const onSubmitAdd = () => {
    const {price, garant} = formOffert;
    if (!price || !garant) {
      toasRef.current.show('debe ingresar Precio/Garantía', 2000);
    } else if (price.length < 0) {
      toasRef.current.show('Precio Vació.', 2000);
    } else if (garant.length < 5) {
      toasRef.current.show('Ingrese los días de garantía ó meses, años ', 2000);
    } else {
      if (!prices.prices.some((p) => p.brand === value)) {
        const list = prices;

        list.prices.push({
          price: price,
          brand: value,
          garant: garant,
        });
        toasRefSuccess.current.show('Se agrego correctamente', 3000);
        setPrices(list);
        setIsVisible(true);
        setFormOffert({price: '', garant: ''});
        inputPrice.current.clear();
        inputGarant.current.clear();
        console.log('PRICE', prices);
      } else {
        toasRef.current.show('Oferta ya registrada', 3000);
      }
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
      <View style={styles.line} />
      <ScrollView horizontal>{renderBrands()}</ScrollView>
      <View style={styles.line} />
      <View style={styles.form}>
        <View style={styles.action}>
          <TextInput
            placeholder="Precio"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            style={[styles.textInput, {color: 'grey'}]}
            autoCapitalize="none"
            onChange={(e) => onChange_text(e, 'price')}
            ref={inputPrice}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Garantía"
            placeholderTextColor="#666666"
            style={[styles.textInput, {color: 'grey'}]}
            autoCapitalize="none"
            onChange={(e) => onChange_text(e, 'garant')}
            ref={inputGarant}
          />
        </View>

        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={onSubmitAdd} style={styles.addList}>
            {/*<Icon name="plus" size={16} color="blue" />*/}
            <Text style={styles.add}>
              {!isVisible ? 'Agregue una oferta' : 'Añadir más'}
            </Text>
          </TouchableOpacity>
          {isVisible ? (
            <TouchableOpacity onPress={onSubmitOffert} style={styles.addList}>
              <Text style={styles.add}>Terminar</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.textFooter}>{message}</Text>
        </View>

        <View>{renderOffert()}</View>
      </View>
    </ScrollView>
  );
}

function defaultForm() {
  return {
    price: '',
    garant: '',
  };
}

const styles = StyleSheet.create({
  viewFormOffert: {
    margin: 20,
  },
  viewBrans: {
    flexDirection: 'row',
    borderRadius: 8,
    margin: 5,
    width: 100,
    padding: 15,
    paddingBottom: 0,
    //backgroundColor: '#fff',
    //shadowOpacity: 0.14,
    //shadowRadius: 4,
    //shadowColor: '#000',
    //shadowOffset: {height: 0, width: 0},
  },
  line: {
    height: 5,
    backgroundColor: '#EBEBEB',
    marginVertical: 1,
  },
  addList: {
    borderWidth: 1,
    borderColor: '#CACACA',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: '#24A6D9',
    fontWeight: '600',
    fontSize: 14,
    //marginTop: 8,
    textAlign: 'center',
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
    //textAlign: 'right'
    top: 0,
    color: 'green',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 10 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
  //probando
  listContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 50,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '95%',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    //marginBottom: 18,
  },
  count: {
    fontWeight: 'bold',
    width: 200,
    textAlign: 'right',
    top: -20,
    paddingRight: 10,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    alignItems: 'center',
    marginTop: 10,
    top: -30,
  },
});
