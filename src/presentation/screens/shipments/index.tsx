import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ListRenderItem,
  ViewStyle,
  Pressable,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useAuth } from '../../../core/auth';
import { useTheme } from '../../../core/theme';
import { Checkbox, IconButton, Button } from '../../components';
import { BellOutlined, Logo } from '../../../assets/svgs';
import { ExpandOutlined } from '../../../assets/svgs/Expand';

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
    const { colors } = useTheme();

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

          <Logo color={colors.primary} width={92} />

          <IconButton type="secondary" icon={<BellOutlined />} />
        </View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <Text>Hello,</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            {name ?? 'User'}
          </Text>
        </View>
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

const ColorMapping = {
  CANCELED: {
    bgColor: '#F4F2F8',
    textColor: '#58536E',
  },
  RECEIVED: {
    bgColor: '#D9E6FD',
    textColor: '#2F50C1',
  },
  DELIVERED: {
    bgColor: '#E3FAD6',
    textColor: '#208D28',
  },
  ERROR: {
    bgColor: '#FEE3D4',
    textColor: '#D12030',
  },
  ON_HOLD: {
    bgColor: '#FFF3D5',
    textColor: '#DB7E21',
  },
};

const ShipmentItem = React.memo(
  ({
    label,
    shipmentId,
    status,
    from,
    to,
    style,
    marked,
    onMark,
  }: ShipmentItemType & {
    style: ViewStyle;
    marked: boolean;
    onMark: () => void;
  }) => {
    const { colors } = useTheme();
    const [expanded, setExpanded] = useState(false);

    const { bgColor, textColor } = ColorMapping[status];
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: colors.cardBackground,
            borderRadius: 10,
            padding: 12,
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Checkbox checked={marked} onSelect={onMark} />
        <Image
          source={require('../../../assets/images/box.png')}
          style={{ width: 40, height: 40, marginLeft: 14 }}
          resizeMode="contain"
        />
        <View style={{ flex: 1, paddingHorizontal: 14 }}>
          <Text
            style={{
              color: '#3F395C',
              fontSize: 13,
            }}
          >
            {label}
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              fontWeight: '600',
              lineHeight: 24,
            }}
          >
            {shipmentId}
          </Text>
          <Text
            style={{
              color: '#757281',
              fontSize: 13,
            }}
          >{`${from} -> ${to}`}</Text>
        </View>

        <View
          style={{
            marginRight: 20,
            borderWidth: 1,
            borderRadius: 4,
            paddingHorizontal: 6,
            paddingVertical: 4,
            borderColor: colors.background,
            backgroundColor: bgColor,
          }}
        >
          <Text
            style={{
              color: textColor,
              fontWeight: '500',
              fontSize: 11,
            }}
          >
            {status?.replace('_', ' ')}
          </Text>
        </View>

        <Pressable
          onPress={() => setExpanded(pre => !pre)}
          style={{
            backgroundColor: colors.background,
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ExpandOutlined />
        </Pressable>
      </View>
    );
  },
);

const Shipments = () => {
  const [markedItems, setMarketItems] = useState<Record<string, boolean>>({});

  const isAllMarked = useMemo(() => {
    const markedItemsArr = Object.values(markedItems);
    return (
      markedItemsArr?.length === dummyShipments?.length &&
      !Object.values(markedItems).some(selection => selection === false)
    );
  }, [markedItems]);

  const _renderItem: ListRenderItem<ShipmentItemType> = useCallback(
    ({ item }) => {
      return (
        <ShipmentItem
          label={item.label}
          shipmentId={item.shipmentId}
          from={item.from}
          to={item.to}
          status={item.status}
          style={{ marginBottom: 8 }}
          marked={markedItems[item.shipmentId]}
          onMark={() => {
            setMarketItems(pre => ({
              ...pre,
              [item.shipmentId]: !pre?.[item.shipmentId],
            }));
          }}
        />
      );
    },
    [markedItems],
  );

  const _keyExtractor = useCallback(
    (item: ShipmentItemType) => item?.shipmentId,
    [],
  );

  return (
    <FlatList<ShipmentItemType>
      style={{ flex: 1 }}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
            paddingVertical: 8,
            backgroundColor: '#fff',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              fontSize: 22,
              color: '#000000',
            }}
          >
            Shipments
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              checked={isAllMarked}
              onSelect={() => {
                setMarketItems(
                  isAllMarked
                    ? {}
                    : dummyShipments.reduce((total, current) => {
                        return {
                          ...total,
                          [current.shipmentId]: true,
                        };
                      }, {}),
                );
              }}
              label="Mark All"
            />
          </View>
        </View>
      }
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 14 }}
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
