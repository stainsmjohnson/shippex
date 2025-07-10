import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withBottomSheet } from '../../../hoc/bottomSheet';
import { useShipments } from '../../../hooks';
import { Header } from './Header';
import { SHIPMENT_STATUS } from '../../../core/constants';

const FilterSheet = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const { setFilter, filters } = useShipments();
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (visible) return;

    setSelected(
      filters.statuses.reduce(
        (total, current) => ({ ...total, [current]: true }),
        {},
      ),
    );
  }, [visible, filters.statuses]);

  const _handleDone = () => {
    const filtered = Object.entries(selected).reduce<string[]>(
      (total, [key, value]) => {
        if (value) return [...total, key];
        return total;
      },
      [],
    );

    setFilter({ statuses: filtered });
    onDismiss();
  };

  return (
    <View>
      <Header onCancel={onDismiss} onDone={_handleDone} />
      <View style={styles.container}>
        <Text style={styles.label}>SHIPMENT STATUS</Text>
        <View style={styles.listContainer}>
          {SHIPMENT_STATUS.map(status => {
            const isSelected = selected?.[status.id];

            const _select = () => {
              setSelected(pre => ({ ...pre, [status.id]: !pre?.[status.id] }));
            };

            return (
              <TouchableOpacity
                key={status?.id}
                onPress={_select}
                style={[
                  styles.chipContainer,
                  isSelected && styles.activeChipContainer,
                ]}
              >
                <Text
                  style={[styles.chipText, isSelected && styles.activeChipText]}
                >
                  {status?.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default withBottomSheet(FilterSheet);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingVertical: 12 },
  label: {
    marginBottom: 12,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 26,
    color: '#58536E',
  },
  listContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  chipContainer: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 2,
    backgroundColor: '#F4F2F8',
    borderColor: '#F4F2F8',
  },
  activeChipContainer: {
    borderColor: '#6E91EC',
  },
  chipText: {
    color: '#58536E',
    fontSize: 16,
  },
  activeChipText: {
    color: '#2F50C1',
  },
});
