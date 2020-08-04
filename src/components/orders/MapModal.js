import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function MapModal(props) {
  const {location, closeModal} = props;

  console.log('MAP MODAL LOCATIPON', location);
  return (
    <>
      <MapView
        style={[styles.container]}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}>
        <MapView.Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>

      <View style={styles.back}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View style={[styles.buttom, styles.menu]}>
            <AntDesign name="close" size={24} color="#FFF" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    alignItems: 'center',
    marginLeft: 170,
    bottom: 100,
  },
  buttom: {
    //position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#F02A4B',
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
});
