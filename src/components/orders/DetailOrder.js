import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../utils/firebase';
import 'firebase/storage';
import 'firebase/firestore';

//component
import Carousel from './Carousel';
import TextTitle from '../TextTitle';

//custom
import orderStyle from '../../customs/OrderScreenStyles';

const screenWidth = Dimensions.get('window').width;
//constante firebase
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function DetailOrder(props) {
  const {order} = props;
  const {descripcion, cantidad, uid, idCar, date} = order;
  const [imgOrder, setImgOrder] = useState('');
  const [resultProfile, setresultprofile] = useState({});
  const {VIN, marca, modelo, serie, tipo} = resultProfile;

  useEffect(() => {
    const imageId = `${order.uid}/${order.id}/${order.id}`;

    firebase
      .storage()
      .ref(`Orders/${imageId}.jpg`)
      .getDownloadURL()
      .then((URL) => {
        //console.log('Respuestas', URL);
        setImgOrder(URL);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    db.collection(uid)
      .doc(idCar)
      .get()
      .then((response) => {
        setresultprofile(response.data());
      });
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View>
        {imgOrder ? (
          <Carousel img={imgOrder} width={screenWidth} height={150} />
        ) : (
          <ActivityIndicator size="large" />
        )}

        <View style={styles.containerItem}>
          <Text style={orderStyle.itemHeader}>PEDIDO</Text>
          <Item title="Información" value={descripcion} />
          <Item title="Cantidad" value={`${cantidad} unidades`} />
          <Item title="Fecha" value={date} />
          <View style={orderStyle.line} />
          <Text style={orderStyle.itemHeader}>OFERTAR</Text>
          <Item title="Findit" sale />
          <View style={orderStyle.line} />
          <Text style={orderStyle.itemHeader}>INFORMACIÓN VEHICULO </Text>
          <Item title="VIN" value={VIN} />
          <Item title="Serie" value={serie} />
          <Item title="Vehiculo" value={marca} />
          <Item title="Modelo" value={modelo} />
          <Item title="Tipo" value={tipo} />
        </View>
      </View>
    </ScrollView>
  );
}
const Item = ({title, value, sale}) => {
  return (
    <View style={styles.item}>
      <TextTitle style={styles.itemTitle}>{title}</TextTitle>
      {sale ? (
        <View style={styles.itemSchedule}>
          <View style={orderStyle.itemTextActiveContainer}>
            <TextTitle style={orderStyle.textActive}>
              Sí, quiero ofertar
            </TextTitle>
          </View>
          <MaterialCommunityIcons
            style={{color: '#fff'}}
            name="send-circle-outline"
            size={25}
          />
        </View>
      ) : (
        <Text style={styles.itemValue}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center',
  },
  itemValue: {
    fontWeight: 'bold',
    width: 200,
    textAlign: 'right',
  },
  containerItem: {
    padding: 20,
  },
  itemSchedule: {
    //backgroundColor: '#3C3C3C',
    backgroundColor: '#8e459e',
    flexDirection: 'row',
    padding: 2,
    paddingHorizontal: 2,
    borderRadius: 20,
  },
});
