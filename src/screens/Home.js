import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import firebase from '../utils/firebase';

import 'firebase/firestore';

//component
import ListOrders from '../components/orders/ListOrders';
//constante firebase
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [startOrders, setStartOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [uidOrders, setUidOrders] = useState([]);
  const limitOrders = 8;

  useEffect(() => {
    const snapShot = db.collection('Orders').get();
    snapShot.then((response) => {
      setTotalOrders(response.size);
    });
    (async () => {
      const resultOrders = [];
      const orders_ = db.collectionGroup('ordenes').limit(limitOrders);

      await orders_
        .get()
        .then((response) => {
          setStartOrders(response.docs[response.docs.length - 1]);
          response.forEach((doc) => {
            let order = doc.data();
            order.id = doc.id;
            resultOrders.push({order});
          });
          setOrders(resultOrders);
        })
        .catch((error) => {});
    })();
  }, []);

  const handleLoadMore = async () => {
    const resultOrders = [];
    orders.length < totalOrders && setIsLoading(true);
    const ordersDb = db
      .collectionGroup('ordenes')
      .startAfter(startOrders)
      .limit(limitOrders);

    await ordersDb.get().then((response) => {
      if (response.docs.length > 0) {
        setStartOrders(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach((doc) => {
        let order = doc.data();
        order.id = doc.id;
        resultOrders.push({order});
      });
      setOrders([...orders, ...resultOrders]);
    });
  };
  return (
    <SafeAreaView>
      <ListOrders
        orders={orders}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
