import React, {useState} from 'react';
import {StyleSheet, Modal, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapModal from './MapModal';
export default function Map(props) {
  const {location, name, height} = props;
  const [isVisible, setIsVisible] = useState(false);
  console.log('UB', location);
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.mapStyle}
        initialRegion={location}
        onPress={() => setIsVisible(true)}>
        <MapView.Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}>
        <MapModal location={location} closeModal={() => setIsVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: '100%',
    height: 100,
  },
});
