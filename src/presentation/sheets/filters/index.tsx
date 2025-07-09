import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { withBottomSheet } from '../../../hoc/bottomSheet';

const LinkButton = ({
  title,
  style,
  onPress,
}: {
  title: string;
  style?: ViewStyle;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
      <Text
        style={{
          color: '#2F50C1',
          fontWeight: '500',
          fontSize: 16,
          lineHeight: 26,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Header = ({
  onCancel,
  onDone,
}: {
  onCancel: () => void;
  onDone: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#EAE7F2',
        justifyContent: 'space-between',
      }}
    >
      <LinkButton
        title="Cancel"
        style={{ minWidth: '30%' }}
        onPress={onCancel}
      />
      <Text style={{ fontSize: 18, fontWeight: '600', lineHeight: 26 }}>
        Filters
      </Text>
      <LinkButton
        title="Done"
        style={{ minWidth: '30%', alignItems: 'flex-end' }}
        onPress={onDone}
      />
    </View>
  );
};

const SHIPMENT_STATUS = [
  {
    id: 'RECEIVED',
    label: 'Received',
  },
  {
    id: 'PUTAWAY',
    label: 'Putaway',
  },
  {
    id: 'DELIVERED',
    label: 'Delivered',
  },
  {
    id: 'CANCELED',
    label: 'Canceled',
  },
  {
    id: 'REJECTED',
    label: 'Rejected',
  },
  {
    id: 'LOST',
    label: 'Lost',
  },
  {
    id: 'ON_HOLD',
    label: 'On Hold',
  },
];

const FilterSheet = ({ onDismiss }: { onDismiss: () => void }) => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const _handleDone = () => {
    const filtered = Object.entries(selected).reduce<string[]>(
      (total, [key, value]) => {
        if (value) return [...total, key];
        return total;
      },
      [],
    );

    console.log(filtered);
    onDismiss();
  };

  return (
    <View>
      <Header onCancel={onDismiss} onDone={_handleDone} />
      <View style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
        <Text
          style={{
            marginBottom: 12,
            fontWeight: '500',
            fontSize: 13,
            lineHeight: 26,
            color: '#58536E',
          }}
        >
          SHIPMENT STATUS
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {SHIPMENT_STATUS.map(status => {
            const isSelected = selected?.[status.id];
            return (
              <TouchableOpacity
                key={status?.id}
                style={[
                  {
                    borderRadius: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 10,
                    marginBottom: 10,
                    borderWidth: 2,
                    backgroundColor: '#F4F2F8',
                    borderColor: '#F4F2F8',
                  },
                  isSelected && {
                    borderColor: '#6E91EC',
                  },
                ]}
                onPress={() => {
                  setSelected(pre => ({
                    ...pre,
                    [status.id]: !pre?.[status.id],
                  }));
                }}
              >
                <Text
                  style={{
                    color: isSelected ? '#2F50C1' : '#58536E',
                    fontSize: 16,
                  }}
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
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: 250,
  },
  buttonContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: 'white',
    padding: 5,
  },
  safeArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomSheetButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 2,
  },
  bottomSheetButtonText: {
    fontWeight: 600,
    textDecorationLine: 'underline',
  },
});
