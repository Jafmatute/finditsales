import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import logo from '../../assets/img/findit-2.png';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from '../../utils/firebase';
//constante firebase
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);
export default function ListActive(props) {
  const {active, handleLoadMore, isLoading} = props;
  return (
    <View>
      {active.length > 0 ? (
        <FlatList
          data={active}
          renderItem={(a) => <Active active={a} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderActive}>
          <ActivityIndicator size="large" />
          <Text>Cargando ofertas</Text>
        </View>
      )}
    </View>
  );
}
function Active(props) {
  const {active} = props;
  const {estado, prices, createAt, idOrder, uidClient} = active.item;
  console.log('ID', props);
  const [title, setTitle] = useState(null);
  const [imageOrders, setImageOrder] = useState(null);
  useEffect(() => {
    db.collection('Orders')
      .doc(uidClient)
      .collection('ordenes')
      .doc(idOrder)
      //.where('uid', '==', uidClient)
      .get()
      .then((response) => {
        //console.log('Respuesta', response.data());
        let name = response.data().descripcion;
        setTitle(name);
      });
  }, [idOrder]);
  useEffect(() => {
    const image = `${uidClient}/${idOrder}/${idOrder}`;
    //console.log(image);
    firebase
      .storage()
      .ref(`Orders/${image}.jpg`)
      .getDownloadURL()
      .then((img) => {
        //console.log(img);
        setImageOrder(img);
      });
  });
  return (
    <View style={styles.cardsWrapper}>
      <View>
        <Image style={styles.card} source={{uri: imageOrders}} />
      </View>

      <View style={styles.cardInfo}>
        <Text style={[styles.cardTitle, {top: 12}]}>{`${title}`}</Text>
        <Text
          style={[
            styles.cardDetails,
            {textAlign: 'right', color: '#8e459e', fontWeight: 'bold'},
          ]}>
          {estado}
        </Text>
        <View style={styles.line} />

        {prices.map((brand, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.cardDetails}>{index + 1}</Text>
              <Text style={styles.cardDetails}>{`${brand.brand}`}</Text>
              <Text style={styles.cardDetails}>{`${brand.price}`}</Text>
              <Text style={styles.cardDetails}>{`${brand.garant}`}</Text>
            </View>
          );
        })}
        <View style={styles.line} />
      </View>
      {/*<View style={styles.viewAdd}>
        <Icon name="plus" size={20} style={styles.icon} />
        </View>*/}
    </View>
  );
}
function FooterList(props) {
  const {isLoading} = props;
  if (isLoading) {
    return (
      <View style={styles.loaderActive}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundActive}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>
          No quedan Ofertas por cargar.
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loaderActive: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  cardsWrapper: {
    flexDirection: 'row',
    height: 100,
    width: '95%',
    backgroundColor: '#fff',
    elevation: 2,
    padding: 6,
    marginVertical: 5,
    marginRight: 2,
    marginLeft: 2,
    borderRadius: 10,
    alignSelf: 'center',
  },
  card: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  cardInfo: {
    width: '70%',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    height: '100%',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
    textAlign: 'justify',
    padding: 1,
  },
  viewAdd: {
    position: 'absolute',
    backgroundColor: '#ccc',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    borderRadius: 14,
  },
  icon: {
    height: 20,
    width: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: 1,
  },
  notFoundActive: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});
