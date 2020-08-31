import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function ItemOffer({list}) {
  const [showListVisble, setShowIsVisible] = useState(false);
  const completedCount = list.prices.filter((todo) => todo.price).length;

  /*function toggleListModal() {
      setShowIsVisible(true);
    }*/
  console.log('COUNT', list);
  return (
    <View>
      <TouchableOpacity
        style={[styles.listContainer, {backgroundColor: '#A7CBD9'}]}
        onPress={() => {}}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {'list.name'}
        </Text>

        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}> {completedCount} </Text>
            <Text style={styles.subTitle}>Total ingresadas</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 29,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 150,
    height: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: '#ffffff',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
});
