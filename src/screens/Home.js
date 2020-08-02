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
  const [isLoading, setIsLoading] = useState(null);
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
  return (
    <SafeAreaView>
      <ListOrders orders={orders} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
