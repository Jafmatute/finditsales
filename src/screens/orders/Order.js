import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Order({navigation, route}) {
  const {order} = route.params.order.item;
  console.log('order', order);
  return (
    <View>
      <Text>order.</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
