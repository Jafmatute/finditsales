import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from '../../utils/firebase';
export default function ListOrders(props) {
  const {orders} = props;
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
          //ListFooterComponent={}
        />
      ) : (
        <View style={styles.loadinOrders}>
          <ActivityIndicator size="large" />
          <Text>Cargando pedidos...</Text>
        </View>
      )}
    </View>
  );
}

const Order = (props) => {
  const {order} = props;
  const {descripcion, cantidad} = order.item.order;
  const [imageOrders, setImageOrder] = useState(null);
  console.log('Order_Compoent', order);
  return (
    <TouchableOpacity onPress={() => console.log('ir a detalle')}>
      <View></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loadinOrders: {
    marginTop: 20,
    alignItems: 'center',
  },
});
