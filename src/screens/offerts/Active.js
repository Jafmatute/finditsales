import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from '../../utils/firebase';
import 'firebase/firestore';

//component
import ListActive from '../../components/offerts/ListActive';

//constante firebase
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function Active() {
  const [userUid, setUserUid] = useState();
  const [activeOffer, setActiveOffer] = useState([]);
  const [totalActive, setTotalActive] = useState(0);
  const [startOffer, setStartOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitOffer = 10;
  useFocusEffect(
    useCallback(() => {
      firebase.auth().onIdTokenChanged((response) => {
        if (response.uid) {
          setUserUid(response.uid);
          db.collection('Offert')
            .doc(response.uid)
            .collection('ofertas')
            .get()
            .then((snap) => {
              setTotalActive(snap.size);
            });
          const resultOffer = [];

          db.collection('Offert')
            .doc(response.uid)
            .collection('ofertas')
            .where('estado', '==', 'pendiente')
            .orderBy('createAt', 'desc')
            .limit(limitOffer)
            .get()
            .then((r) => {
              setStartOffer(r.docs[r.docs.length - 1]);

              r.forEach((doc) => {
                const offer = doc.data();
                offer.id = doc.id;
                resultOffer.push(offer);
              });
              setActiveOffer(resultOffer);
            });
        }
      });
    }, []),
  );

  const handleLoadMore = () => {
    const resultOffer = [];
    activeOffer.length < totalActive && setIsLoading(true);
    db.collection('Offert')
      .doc(userUid)
      .collection('ofertas')
      .where('estado', '==', 'pendiente')
      .orderBy('createAt', 'desc')
      .startAfter(startOffer.data().createAt)
      .limit(limitOffer)
      .get()
      .then((r) => {
        if (r.docs.length > 0) {
          setStartOffer(r.docs[r.docs.length - 1]);
        } else {
          setIsLoading(false);
        }
        r.forEach((doc) => {
          const offer = doc.data();
          offer.id = doc.id;
          resultOffer.push(offer);
        });
        setActiveOffer([...activeOffer, ...resultOffer]);
      });
  };

  return (
    <React.Fragment>
      <ListActive
        active={activeOffer}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
