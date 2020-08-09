import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../utils/firebase';
import 'firebase/storage';
//custom
import orderStyle from '../../customs/OrderScreenStyles';
export default function ListOrders(props) {
  const {orders, isLoading, handleLoadMore} = props;
  const navigation = useNavigation();
  //console.log('LIST_ORDERS', orders);
  //console.log('TAMAÑO LENGHT', orders.length);
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
  const {descripcion, cantidad, uid, id, date, time} = order.item.order;
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
    <View style={orderStyle.viewCard}>
      <View style={styles.viewOrderImg}>
        <Image
          style={styles.imageOrders}
          resizeMode="cover"
          source={{uri: imageOrders}}
          onLoadEnd={loadingEnd}
        />
        <ActivityIndicator color="fff" animating={loadingImage} />
      </View>
      {/*Información del pedido cardet*/}
      <View>
        <Text style={orderStyle.itemHeader}>{descripcion.substr(0, 35)}</Text>
        <View style={orderStyle.line} />
        <View style={styles.viewCantFech}>
          <Text style={styles.order}>{`Cantidad:${cantidad}`}</Text>
          <Text style={[styles.order, {marginHorizontal: 90}]}>{date}</Text>
        </View>
        <Text style={[styles.order, {top: -10}]}>{` ${time}`}</Text>
        <View style={orderStyle.line} />
      </View>
      {/*Fin información del epdido cardet*/}
      <View style={styles.cardBodyBottom}>
        <TouchableOpacity
          style={orderStyle.itemTextActiveContainer}
          onPress={() => navigation.navigate('order', {order})}>
          <View>
            {/*<AntDesign name="checkcircleo" size={20} />*/}
            <Text style={orderStyle.textActive}>Detalle</Text>
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

const styles = StyleSheet.create({
  loadinOrders: {
    marginTop: 20,
    alignItems: 'center',
  },
  viewOrderImg: {
    marginRight: 15,
    marginVertical: 15,
    paddingTop: 10,
  },
  imageOrders: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  viewCantFech: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  order: {
    paddingTop: 2,
    color: 'grey',
  },
  cardBodyBottom: {
    marginTop: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 245,
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
  },
});
