import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../utils/firebase';
import 'firebase/storage';
export default function ListOrders(props) {
  const {orders, isLoading, handleLoadMore} = props;
  const navigation = useNavigation();
  //console.log('LIST_ORDERS', orders);
  console.log('TAMAÑO LENGHT', orders.length);
  return (
    <View>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={(order) => (
            <Order order={order} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderOrder}>
          <ActivityIndicator size="large" />
          <Text>Cargando pedidos...</Text>
        </View>
      )}
    </View>
  );
}

const Order = (props) => {
  const {order, navigation} = props;
  const {descripcion, cantidad, uid, id, date} = order.item.order;
  const [imageOrders, setImageOrder] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  //console.log('Order_Component', order);
  useEffect(() => {
    const image = `${uid}/${id}/${id}`;
    //console.log(image);
    firebase
      .storage()
      .ref(`Orders/${image}.jpg`)
      .getDownloadURL()
      .then((img) => {
        //console.log(img);
        setImageOrder(img);
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log("File doesn't exist");
            break;

          case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object");
            break;

          case 'storage/canceled':
            console.log('User canceled the upload');
            break;

          case 'storage/unknown':
            console.log('Unknown error occurred, inspect the server response');
            break;
        }
      });
  });

  const loadingEnd = () => {
    setLoadingImage(false);
  };

  return (
    <View style={styles.viewOrder}>
      <View style={styles.viewOrderImg}>
        <Image
          style={styles.imageOrders}
          resizeMode="cover"
          source={{uri: imageOrders}}
          onLoadEnd={loadingEnd}
        />
        <ActivityIndicator color="fff" animating={loadingImage} />
      </View>
      <View>
        <Text style={styles.orderName}>{descripcion.substr(0, 35)}</Text>
        <View>
          <Text style={styles.ordercant}>{`Cantidad:${cantidad}`}</Text>
        </View>
      </View>
      <View style={styles.cardBodyBottom}>
        <TouchableOpacity
          style={styles.detailContainer}
          onPress={() => navigation.navigate('order', {order})}>
          <View style={[styles.cardGroupIcon]}>
            {/*<AntDesign name="checkcircleo" size={20} />*/}
            <Text style={[styles.detail]}>Detalle</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={[styles.cardGroupIcon]}>
            {/*<Feather name="map-pin" size={20} />*/}
            <Text style={styles.cardBottomTitle}>Ubicación</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FooterList = (props) => {
  const {isLoading} = props;
  if (isLoading) {
    return (
      <View style={styles.loadinOrders}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundOrders}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>
          No quedan pedidos por cargar.
        </Text>
      </View>
    );
  }
};

const W = Dimensions.get('window').width / 4;
const styles = StyleSheet.create({
  loadinOrders: {
    marginTop: 20,
    alignItems: 'center',
  },
  viewOrder: {
    flexDirection: 'row',
    //margin: 10,
    //nuevos
    borderRadius: 8,
    margin: 5,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#fff',
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: {height: 0, width: 0},
  },
  viewOrderImg: {
    marginRight: 15,
  },
  imageOrders: {
    width: 80,
    height: 80,
    //width: W,
    //height: W,
    borderRadius: 8,
  },
  orderName: {
    fontWeight: 'bold',
  },
  ordercant: {
    paddingTop: 2,
    color: 'grey',
  },
  cardBodyBottom: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 160,
    position: 'absolute',
    //nuevos
    backgroundColor: '#8e459e',
    padding: 2,
    paddingHorizontal: 2,
    borderRadius: 20,
  },
  cardBottomTitle: {
    fontSize: 12,
    marginTop: 2,
    margin: 2,
    fontWeight: 'bold',
    //nuevos
    color: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  cardGroupIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  loaderOrder: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundOrders: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'grey',
    //borderRadius: 14,
  },
  detailContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  detail: {
    paddingHorizontal: 10,
    color: '#3C3C3C',
    backgroundColor: '#fff',
    paddingVertical: 3,
    borderRadius: 20,
  },
});
