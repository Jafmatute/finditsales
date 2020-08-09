import React from 'react';

//component
import DetailOrder from '../../components/orders/DetailOrder';

export default function Order({navigation, route}) {
  const {order} = route.params.order.item;

  return <DetailOrder order={order} navigation={navigation} />;
}
