import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import firebase from '../../utils/firebase';
import 'firebase/storage';

//component
import Carousel from '../../components/orders/Carousel';
import TextTitle from '../../components/TextTitle';

const screenWidth = Dimensions.get('window').width;
export default function Order({navigation, route}) {
  const {order} = route.params.order.item;
  const {descripcion, cantidad, uid, id, date} = order;
  const [imgOrder, setImgOrder] = useState('');
  //console.log('order', order);

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

  return (
    <View>
      {imgOrder ? (
        <Carousel img={imgOrder} width={screenWidth} height={200} />
      ) : (
        <ActivityIndicator size="large" />
      )}
      <View style={styles.containerItem}>
        <Text style={styles.itemHeader}>PEDIDO</Text>
        <Item title="Información" value={descripcion} />
        <Item title="Cantidad" value={`${cantidad} unidades`} />
        <Item title="Fecha" value={date} />
        <View style={styles.line} />
        <Text style={styles.itemHeader}>ENTREGA</Text>
        <Item title="Schedule" schedule />
        <View style={styles.line} />
        <Text style={styles.itemHeader}>MY INFO </Text>
      </View>
    </View>
  );
}
const Item = ({title, value}) => {
  return (
    <View style={styles.item}>
      <TextTitle style={styles.itemTitle}>{title}</TextTitle>
      <Text style={styles.itemValue}>{value}</Text>
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
  itemHeader: {
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: 20,
  },
});
