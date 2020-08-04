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

const screenWidth = Dimensions.get('window').width;
export default function Order({navigation, route}) {
  const {order} = route.params.order.item;
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
    </View>
  );
}

const styles = StyleSheet.create({});
