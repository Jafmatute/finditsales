import React from 'react';

import {Card} from 'react-native-paper';

export default function Carousel(props) {
  const {img, width, height} = props;
  return (
    <Card.Cover
      style={{width: width, height: height}}
      source={{uri: `${img}`}}></Card.Cover>
  );
}
