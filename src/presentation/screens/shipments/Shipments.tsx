import { Text, View, FlatList, ListRenderItem, StyleSheet } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Checkbox } from '../../components';
import { useShipments } from '../../../hooks';
import { ShipmentItemType } from '../../../context';
import { ShipmentItem } from './ShipmentItem';

const ListHeader = ({
  isAllMarked,
  onMarkAll,
}: {
  isAllMarked: boolean;
  onMarkAll: () => void;
}) => (
  <View style={styles.listHeaderContainer}>
    <Text style={styles.listHeaderTitle}>Shipments</Text>
    <View style={styles.listHeaderAction}>
      <Checkbox checked={isAllMarked} onSelect={onMarkAll} label="Mark All" />
    </View>
  </View>
);

export const Shipments = () => {
  const { shipments } = useShipments();
  const [markedItems, setMarkedItems] = useState<Record<string, boolean>>({});

  const isAllMarked = useMemo(() => {
    const markedItemsArr = Object.values(markedItems);
    return (
      markedItemsArr?.length === shipments?.length &&
      !Object.values(markedItems).some(selection => selection === false)
    );
  }, [markedItems, shipments]);

  const _renderItem: ListRenderItem<ShipmentItemType> = useCallback(
    ({ item }) => {
      const _onMark = () => {
        setMarkedItems(pre => ({
          ...pre,
          [item.shipmentId]: !pre?.[item.shipmentId],
        }));
      };

      return (
        <ShipmentItem
          label={item.label}
          shipmentId={item.shipmentId}
          from={item.from}
          to={item.to}
          status={item.status}
          phone={item?.phone}
          style={styles.mb8}
          marked={markedItems[item.shipmentId]}
          onMark={_onMark}
        />
      );
    },
    [markedItems],
  );

  const _keyExtractor = useCallback(
    (item: ShipmentItemType) => item?.shipmentId,
    [],
  );

  const _markAll = () => {
    const _nextMarkedList = !isAllMarked
      ? shipments.reduce(
          (total, current) => ({
            ...total,
            [current.shipmentId]: true,
          }),
          {},
        )
      : {};

    setMarkedItems(_nextMarkedList);
  };

  return (
    <FlatList<ShipmentItemType>
      style={styles.flex}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <ListHeader isAllMarked={isAllMarked} onMarkAll={_markAll} />
      }
      contentContainerStyle={styles.content}
      keyExtractor={_keyExtractor}
      data={shipments}
      renderItem={_renderItem}
    />
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: 16, paddingVertical: 14 },
  mb8: { marginBottom: 8 },
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  listHeaderTitle: {
    fontWeight: '600',
    fontSize: 22,
    color: '#000000',
  },
  listHeaderAction: { flexDirection: 'row', alignItems: 'center' },
});
