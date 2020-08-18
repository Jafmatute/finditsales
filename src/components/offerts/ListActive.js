import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import logo from '../../assets/img/findit-2.png';
import Icon from 'react-native-vector-icons/AntDesign';
export default function ListActive(props) {
  const {active, handleLoadMore, isLoading} = props;

  return (
    <View>
      {active.length > 0 ? (
        <FlatList
          data={active}
          renderItem={(a) => <Active active={a} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderActive}>
          <ActivityIndicator size="large" />
          <Text>Cargando ofertas</Text>
        </View>
      )}
    </View>
  );
}
function Active(props) {
  const {active} = props;
  const {brand, estado, garant, price, product} = active.item;
  console.log('ACTIVE', props);
  return (
    <View style={styles.cardsWrapper}>
      <View>
        <Image style={styles.card} source={logo} />
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{`${product} de ${brand}`}</Text>
        <View style={styles.line} />
        <Text style={styles.cardDetails}>{estado}</Text>
        <Text
          style={
            styles.cardDetails
          }>{`La garantía del pedido es ${garant}`}</Text>
        <View style={styles.line} />
        <View>
          <Text
            style={[
              styles.cardDetails,
              {fontWeight: 'bold'},
            ]}>{`Monto ofertado:`}</Text>
          <Text
            style={[
              styles.cardDetails,
              {textAlign: 'right', top: -13},
            ]}>{`${price} LPS HN`}</Text>
        </View>
      </View>
      {/*<View style={styles.viewAdd}>
        <Icon name="plus" size={20} style={styles.icon} />
        </View>*/}
    </View>
  );
}
function FooterList(props) {
  const {isLoading} = props;
  if (isLoading) {
    return (
      <View style={styles.loaderActive}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundActive}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>
          No quedan Ofertas por cargar.
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loaderActive: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  cardsWrapper: {
    /*marginTop: 20,
    width: '90%',
    alignSelf: 'center',*/
    flexDirection: 'row',
    height: 100,
    width: '95%',
    backgroundColor: '#fff',
    elevation: 2,
    padding: 6,
    marginVertical: 5,
    marginRight: 2,
    marginLeft: 2,
    borderRadius: 10,
    alignSelf: 'center',
  },
  card: {
    /*height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,*/
    height: 50,
    width: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  cardInfo: {
    /*flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',*/
    width: '65%',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    height: '100%',
  },
  cardTitle: {
    //fontWeight: 'bold',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 11,
    color: '#444',
  },
  viewAdd: {
    /*width: '25%',
    justifyContent: 'flex-end',
    height: '100%',
    marginHorizontal: 50,*/
    position: 'absolute',
    backgroundColor: '#ccc',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    borderRadius: 14,
  },
  icon: {
    height: 20,
    width: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: 1,
  },
  notFoundActive: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});
