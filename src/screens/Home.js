import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
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
  const limitOrders = 10;

  useFocusEffect(
    useCallback(() => {
      (async () => {
        db.collection('Orders')
          .get()
          .then((snap) => {
            setTotalOrders(snap.size);
            console.log('COUNTS', snap.size);
          });
      })();
      (async () => {
        const resultOrders = [];
        await db
          .collectionGroup('ordenes')
          .where('estado', '==', 1)
          .orderBy('date', 'desc')
          .limit(limitOrders)
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
          .catch((error) => {
            console.log('collectionGroups', error);
          });
      })();
    }, []),
  );

  const handleLoadMore = () => {
    const resultOrders = [];
    orders.length < totalOrders && setIsLoading(true);

    db.collectionGroup('ordenes')
      .where('estado', '==', 1)
      .orderBy('date', 'desc')
      .startAfter(startOrders)
      .limit(limitOrders)
      .get()
      .then((response) => {
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
