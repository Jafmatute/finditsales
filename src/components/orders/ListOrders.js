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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from '../../utils/firebase';
import 'firebase/storage';
export default function ListOrders(props) {
  const {orders, isLoading} = props;
  console.log('LIST_ORDERS', orders);
  return (
    <View>
      {orders ? (
        <FlatList
          data={orders}
          renderItem={(order) => <Order order={order} />}
          keyExtractor={(item, index) => index.toString()}
          //onEndReached={}
          onEndReachedThreshold={0}
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
  const {order} = props;
  const {descripcion, cantidad, uid, id} = order.item.order;
  const [imageOrders, setImageOrder] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  console.log('Order_Component', order);
  useEffect(() => {
    const image = `${uid}/${id}/${id}`;
    console.log(image);
    firebase
      .storage()
      .ref(`Orders/${image}.jpg`)
      .getDownloadURL()
      .then((img) => {
        console.log(img);
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
    <TouchableOpacity onPress={() => console.log('ir a detalle')}>
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
          <Text style={styles.orderName}>{descripcion}</Text>
          <Text style={styles.ordercant}>{`Cantidad:${cantidad}`}</Text>
        </View>
        <View style={styles.cardBodyBottom}>
          <View
            style={[
              styles.cardGroupIcon,
              {borderRadius: 14, backgroundColor: '#33A0FF'},
            ]}>
            {/*<AntDesign name="checkcircleo" size={20} />*/}
            <Text style={[styles.cardBottomTitle]}>Detalle</Text>
          </View>
          <View
            style={[
              styles.cardGroupIcon,
              {backgroundColor: '#8e459e', borderRadius: 14},
            ]}>
            {/*<AntDesign name="closecircleo" size={20} />*/}
            <Text style={styles.cardBottomTitle}>Ofertar</Text>
          </View>

          <View
            style={[
              styles.cardGroupIcon,
              {borderRadius: 14, backgroundColor: '#296C80'},
            ]}>
            {/* <MaterialIcons name="explore" size={20} />*/}
            <Text style={styles.cardBottomTitle}>Ubicación</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    marginHorizontal: 100,
    position: 'absolute',
  },
  cardBottomTitle: {
    fontSize: 12,
    marginTop: 5,
    margin: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardGroupIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  loaderOrder: {
    marginTop: 10,
    marginBottom: 10,
  },
  notFoundOrders: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'grey',
    //borderRadius: 14,
  },
});
