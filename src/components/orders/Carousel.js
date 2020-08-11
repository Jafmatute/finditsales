import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {Card} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function Carousel(props) {
  const {img, width, height} = props;
  const [isVisible, setIsvisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setIsvisible(true)}>
        <Card.Cover
          style={{width: width, height: height}}
          source={{uri: `${img}`}}></Card.Cover>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsvisible(false)}>
        <ImageZoom img={img} closeModal={() => setIsvisible(false)} />
      </Modal>
    </>
  );
}

const fall = new Animated.Value(1);

const ImageZoom = (props) => {
  const {img, closeModal} = props;
  console.log(img);
  return (
    <View style={styles.container}>
      <Image style={styles.imageZoom} source={{uri: img}} />
      <View style={styles.back}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View style={[styles.buttom, styles.menu]}>
            <AntDesign name="close" size={24} color="#FFF" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageZoom: {
    width: 400,
    height: Platform.OS === 'ios' ? 500 : 400,
    top: 100,
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
