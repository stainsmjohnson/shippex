import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, { useCallback } from 'react';
import { useAuth } from '../../../core/auth';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';
import { useTheme } from '../../../core/theme';

type ShipmentItemType = {
  shipmentId: string;
  label: string;
  from: string;
  to: string;
  status: 'RECEIVED' | 'CANCELED' | 'DELIVERED' | 'ON_HOLD' | 'ERROR';
};

const dummyShipments: ShipmentItemType[] = [
  {
    shipmentId: '41785691423',
    label: 'AWB',
    from: 'Cairo',
    to: 'Alexandria',
    status: 'RECEIVED',
  },
  {
    shipmentId: '41785691424',
    label: 'BOL',
    from: 'Chennai',
    to: 'Gurgaon',
    status: 'CANCELED',
  },
  {
    shipmentId: '41785691425',
    label: 'Consignment Note',
    from: 'Gurgaon',
    to: 'Bangalore',
    status: 'CANCELED',
  },
  {
    shipmentId: '41785691426',
    label: 'Test',
    from: 'Kochi',
    to: 'Bangalore',
    status: 'CANCELED',
  },
  {
    shipmentId: '41785691427',
    label: 'Tracking ID',
    from: 'Delhi',
    to: 'Mumbai',
    status: 'DELIVERED',
  },
  {
    shipmentId: '41785691428',
    label: 'LR Number',
    from: 'Pune',
    to: 'Hyderabad',
    status: 'ON_HOLD',
  },
  {
    shipmentId: '41785691429',
    label: 'Waybill',
    from: 'Ahmedabad',
    to: 'Surat',
    status: 'RECEIVED',
  },
  {
    shipmentId: '41785691430',
    label: 'BOL',
    from: 'Nagpur',
    to: 'Indore',
    status: 'ERROR',
  },
  {
    shipmentId: '41785691431',
    label: 'Dispatch ID',
    from: 'Trivandrum',
    to: 'Chennai',
    status: 'DELIVERED',
  },
  {
    shipmentId: '41785691432',
    label: 'Courier No.',
    from: 'Coimbatore',
    to: 'Bangalore',
    status: 'RECEIVED',
  },
  {
    shipmentId: '41785691433',
    label: 'Scan Code',
    from: 'Lucknow',
    to: 'Kanpur',
    status: 'ON_HOLD',
  },
  {
    shipmentId: '41785691434',
    label: 'Order ID',
    from: 'Noida',
    to: 'Delhi',
    status: 'CANCELED',
  },
  {
    shipmentId: '41785691435',
    label: 'Package ID',
    from: 'Raipur',
    to: 'Bhopal',
    status: 'ERROR',
  },
  {
    shipmentId: '41785691436',
    label: 'Delivery Code',
    from: 'Patna',
    to: 'Ranchi',
    status: 'RECEIVED',
  },
  {
    shipmentId: '41785691437',
    label: 'AWB',
    from: 'Madurai',
    to: 'Chennai',
    status: 'RECEIVED',
  },
  {
    shipmentId: '41785691438',
    label: 'Tracking ID',
    from: 'Vijayawada',
    to: 'Visakhapatnam',
    status: 'DELIVERED',
  },
  {
    shipmentId: '41785691439',
    label: 'BOL',
    from: 'Agra',
    to: 'Lucknow',
    status: 'ON_HOLD',
  },
  {
    shipmentId: '41785691440',
    label: 'Consignment Note',
    from: 'Jodhpur',
    to: 'Jaipur',
    status: 'ERROR',
  },
  {
    shipmentId: '41785691441',
    label: 'Parcel No.',
    from: 'Shimla',
    to: 'Manali',
    status: 'DELIVERED',
  },
  {
    shipmentId: '41785691442',
    label: 'Container No.',
    from: 'Kolkata',
    to: 'Bhubaneswar',
    status: 'RECEIVED',
  },
];

const Header = React.memo(
  ({ imageUrl, name }: { imageUrl: string | null; name: string | null }) => {
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
          ) : null}

          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>
            Shippex
          </Text>

          <IconButton type="secondary" />
        </View>
        <Text>Hello,</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
          {name ?? 'User'}
        </Text>
      </View>
    );
  },
);

const HeaderActions = React.memo(({}: {}) => {
  return (
    <View>
      <TextInput
        placeholder="Search"
        onChangeText={text => console.log(text)}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
        }}
      >
        <Button title="Filters" type="secondary" style={{ flex: 1 }} />
        <Button
          title="Add Scan"
          type="primary"
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </View>
  );
});

const ShipmentItem = React.memo(
  ({
    label,
    shipmentId,
    status,
    from,
    to,
  }: {
    label: string;
    shipmentId: string;
    from: string;
    to: string;
    status: string;
  }) => {
    const theme = useTheme();

    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.cardBackground,
        }}
      >
        {/* checkbox */}
        <Image
          source={require('../../../assets/images/box.png')}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text>{label}</Text>
          <Text>{shipmentId}</Text>
          <Text>{`${from} -> ${to}`}</Text>
        </View>

        <View>
          <Text>{status}</Text>
        </View>

        <View
          style={{
            backgroundColor: theme.colors.background,
            width: 24,
            height: 24,
            borderRadius: 12,
          }}
        ></View>
      </View>
    );
  },
);

const Shipments = () => {
  const _renderItem: ListRenderItem<ShipmentItemType> = useCallback(
    ({ item }) => {
      return (
        <ShipmentItem
          label={item.label}
          shipmentId={item.shipmentId}
          from={item.from}
          to={item.to}
          status={item.status}
        />
      );
    },
    [],
  );

  const _keyExtractor = useCallback(
    (item: ShipmentItemType) => item?.shipmentId,
    [],
  );

  return (
    <FlatList<ShipmentItemType>
      style={{ flex: 1 }}
      keyExtractor={_keyExtractor}
      data={dummyShipments}
      renderItem={_renderItem}
    />
  );
};

const ShipmentScreen = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header imageUrl={user?.imageUrl ?? null} name={user?.name ?? null} />
      <HeaderActions />
      <Shipments />
    </SafeAreaView>
  );
};

export default ShipmentScreen;

const styles = StyleSheet.create({});
