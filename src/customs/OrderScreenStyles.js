import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  //detalle de información
  line: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: 10,
  },
  itemTextActiveContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  itemHeader: {
    fontWeight: 'bold',
  },
  textActive: {
    paddingHorizontal: 10,
    color: '#3C3C3C',
    backgroundColor: '#fff',
    paddingVertical: 3,
    borderRadius: 20,
  },
  //fin detalle de información

  //Card
  viewCard: {
    flexDirection: 'row',
    borderRadius: 8,
    margin: 5,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#fff',
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: {height: 0, width: 0},
  },
});
