import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItem,
  ViewStyle,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useAuth } from '../../../core/auth';
import { useTheme } from '../../../core/theme';
import { Checkbox, IconButton, Button, SearchBar } from '../../components';
import {
  BellOutlined,
  ChevronRightOutlined,
  Logo,
  WhatsappOutlined,
  PhoneOutlined,
  FilterOutlined,
  ScanSmallOutlined,
  SearchOutlined,
} from '../../../assets/svgs';
import { ExpandOutlined } from '../../../assets/svgs/Expand';
import FilterSheet from '../../sheets/filters';
import { RedirectExternal } from '../../../utils/deeplink';

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

const HeaderActions = React.memo(({ onFilter }: { onFilter: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <SearchBar
        value={searchTerm}
        placeholder="Search"
        onChangeText={setSearchTerm}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
        }}
      >
        <Button
          title="Filters"
          type="gray"
          size="medium"
          style={{ flex: 1 }}
          onPress={onFilter}
          icon={<FilterOutlined />}
        />
        <Button
          title="Add Scan"
          type="primary"
          size="medium"
          style={{ flex: 1, marginLeft: 8 }}
          icon={<ScanSmallOutlined />}
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

const CustomButton = ({
  title,
  color = '#6E91EC',
  icon,
  onPress,
  style,
}: {
  title: string;
  color?: string;
  icon?: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  const hasIcon = icon !== undefined;

  return (
    <TouchableOpacity
      style={[
        {
          paddingHorizontal: 20,
          paddingVertical: 8,
          borderRadius: 10,
          backgroundColor: color,
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}
    >
      {hasIcon ? icon : null}
      <Text
        style={{
          color: '#fff',
          marginLeft: hasIcon ? 8 : 0,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ShipmentLocation = ({
  origin,
  rightAlign,
  city,
  address,
}: {
  origin?: boolean;
  rightAlign?: boolean;
  city: string;
  address: string;
}) => {
  return (
    <View style={[{ flex: 1 }, rightAlign && { alignItems: 'flex-end' }]}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 11,
          fontWeight: '400',
          color: '#2F50C1',
        }}
      >
        {origin ? 'Origin' : 'Destination'}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 16,
          fontWeight: '400',
          color: '#000000',
          lineHeight: 22,
        }}
      >
        {city}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 13,
          fontWeight: '300',
          color: '#58536E',
        }}
      >
        {address}
      </Text>
    </View>
  );
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
      <Pressable
        style={[{ borderRadius: 10, overflow: 'hidden' }, style]}
        onPress={() => setExpanded(pre => !pre)}
      >
        <View
          style={[
            {
              flexDirection: 'row',
              padding: 12,
              alignItems: 'center',
              backgroundColor: colors.cardBackground,
            },
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
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: '#757281',
                  fontSize: 13,
                }}
              >
                {from}
              </Text>
              <ChevronRightOutlined width={7} style={{ marginHorizontal: 8 }} />
              <Text
                style={{
                  color: '#757281',
                  fontSize: 13,
                }}
              >
                {to}
              </Text>
            </View>
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

          <View
            style={{
              borderWidth: 2,
              borderRadius: 200,
              borderColor: expanded ? '#4561DB40' : 'transparent',
            }}
          >
            <Pressable
              onPress={() => setExpanded(pre => !pre)}
              style={{
                backgroundColor: expanded ? '#6E91EC' : colors.background,
                width: 24,
                height: 24,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ExpandOutlined color={!expanded ? '#4561DB' : '#FFFFFF'} />
            </Pressable>
          </View>
        </View>
        {expanded && (
          <>
            <View
              style={{
                height: 2,
                overflow: 'hidden',
                backgroundColor: colors.cardBackground,
              }}
            >
              <View
                style={{
                  borderStyle: 'dashed',
                  borderColor: '#FFFFFF',
                  borderWidth: 2,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: '#F4F2F880',
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <ShipmentLocation
                  origin
                  city={'Cairo'}
                  address={'Dokki, 22 Nile St.'}
                />
                <ChevronRightOutlined />
                <ShipmentLocation
                  rightAlign
                  city={'Alexandria'}
                  address={'Smoha, 22 max St.'}
                />
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                <CustomButton
                  title="Call"
                  icon={<PhoneOutlined />}
                  onPress={() => {
                    RedirectExternal.Dialer('9847927765');
                  }}
                />
                <CustomButton
                  title="Whatsapp"
                  style={{ marginLeft: 14 }}
                  color="#25D366"
                  icon={<WhatsappOutlined />}
                  onPress={() => {
                    RedirectExternal.Whatsapp(
                      '919847927765',
                      'Hello, I have a query!',
                    );
                  }}
                />
              </View>
            </View>
          </>
        )}
      </Pressable>
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
  const filterSheetRef = useRef<any>(null);
  const { colors } = useTheme();
  const { user } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header imageUrl={user?.imageUrl ?? null} name={user?.name ?? null} />
      <HeaderActions onFilter={() => filterSheetRef?.current?.show()} />
      <Shipments />

      <FilterSheet ref={filterSheetRef} />
    </SafeAreaView>
  );
};

export default ShipmentScreen;

const styles = StyleSheet.create({});
