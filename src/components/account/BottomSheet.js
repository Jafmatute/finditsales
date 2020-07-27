import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Animated from 'react-native-reanimated';

export const renderHeader = () => (
  <>
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  </>
);

export const renderInner = (props) => {
  return (
    <>
      <View style={styles.panel}>
        {/**Titulo de la subida de las fotos */}
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Subir Foto</Text>
          <Text style={styles.panelSubtitle}>Elige tu foto de perfil</Text>
        </View>
        {/**subida de fotos */}

        <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Tomar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Elige de la biblioteca</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.panelButton, {backgroundColor: '#FF6347'}]}
          onPress={() => props.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ffffff',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    //elevation:5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#8e459e',
    alignItems: 'center',
    marginVertical: 7,
    justifyContent: 'flex-end',
    /*padding: 13,
    borderRadius: 10,
    backgroundColor: '#08d4c4',
    alignItems: 'center',
    marginVertical: 7,*/
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
