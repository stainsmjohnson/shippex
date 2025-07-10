import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  ViewStyle,
  Pressable,
  StyleProp,
} from 'react-native';
import { makeStyles } from '../../../core/theme';
import { Checkbox } from '../../components';
import {
  ChevronRightOutlined,
  WhatsappOutlined,
  PhoneOutlined,
} from '../../../assets/svgs';
import { ExpandOutlined } from '../../../assets/svgs/Expand';
import { RedirectExternal } from '../../../utils/deeplink';
import { ShipmentItemType } from '../../../context';
import { ShipmentLocation } from './ShipmentLocation';
import { CustomButton } from './CustomButton';

type Props = ShipmentItemType & {
  style: StyleProp<ViewStyle>;
  marked: boolean;
  onMark: () => void;
};

export const ShipmentItem = React.memo(
  ({
    label,
    shipmentId,
    status,
    from,
    to,
    phone,
    style,
    marked,
    onMark,
  }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const { styles } = useStyles({ status, expanded });

    const _toggle = () => setExpanded(pre => !pre);

    const _openDialer = () => {
      RedirectExternal.Dialer(phone);
    };

    const _openWhatsapp = () => {
      RedirectExternal.Whatsapp(phone, 'Hello, I have a query!');
    };

    return (
      <Pressable style={[styles.container, style]} onPress={_toggle}>
        <View style={styles.baseView}>
          <Checkbox checked={marked} onSelect={onMark} />
          <Image
            source={require('../../../assets/images/box.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.baseContent}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.id}>{shipmentId}</Text>
            <View style={styles.citis}>
              <Text style={styles.baseCity}>{from.city}</Text>
              <ChevronRightOutlined width={7} style={styles.baseArrow} />
              <Text style={styles.baseCity}>{to.city}</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{status?.replace('_', ' ')}</Text>
          </View>

          <View style={styles.expandCtaShadow}>
            <Pressable onPress={_toggle} style={styles.expandCta}>
              <ExpandOutlined color={!expanded ? '#4561DB' : '#FFFFFF'} />
            </Pressable>
          </View>
        </View>
        {expanded && (
          <>
            <View style={styles.borderContainer}>
              <View style={styles.border} />
            </View>
            <View style={styles.expandedContainer}>
              <View style={styles.locationContainer}>
                <ShipmentLocation
                  origin
                  city={from.city}
                  address={from.address}
                />
                <ChevronRightOutlined />
                <ShipmentLocation
                  rightAlign
                  city={to.city}
                  address={to.address}
                />
              </View>
              <View style={styles.expandedActions}>
                <CustomButton
                  title="Call"
                  icon={<PhoneOutlined />}
                  onPress={_openDialer}
                />
                <CustomButton
                  title="Whatsapp"
                  style={styles.ml14}
                  color="#25D366"
                  icon={<WhatsappOutlined />}
                  onPress={_openWhatsapp}
                />
              </View>
            </View>
          </>
        )}
      </Pressable>
    );
  },
);

const ColorMapping = {
  CANCELED: { bgColor: '#F4F2F8', textColor: '#58536E' },
  RECEIVED: { bgColor: '#D9E6FD', textColor: '#2F50C1' },
  DELIVERED: { bgColor: '#E3FAD6', textColor: '#208D28' },
  ERROR: { bgColor: '#FEE3D4', textColor: '#D12030' },
  ON_HOLD: { bgColor: '#FFF3D5', textColor: '#DB7E21' },
};

const useStyles = makeStyles<{
  status: ShipmentItemType['status'];
  expanded: boolean;
}>(({ colors, params }) => {
  const statusColor = params?.status ? ColorMapping[params?.status] : null;

  return {
    container: { borderRadius: 10, overflow: 'hidden' },
    baseView: {
      flexDirection: 'row',
      padding: 12,
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
    },
    logo: { width: 40, height: 40, marginLeft: 14 },
    baseContent: { flex: 1, paddingHorizontal: 14 },
    label: { color: '#3F395C', fontSize: 13 },
    id: { color: '#000000', fontSize: 18, fontWeight: '600', lineHeight: 24 },
    citis: { flexDirection: 'row' },
    baseCity: { color: '#757281', fontSize: 13 },
    baseArrow: { marginHorizontal: 8 },

    statusContainer: {
      marginRight: 20,
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderColor: colors.background,
      backgroundColor: statusColor?.bgColor,
    },
    statusText: {
      color: statusColor?.textColor,
      fontWeight: '500',
      fontSize: 11,
    },
    expandCtaShadow: {
      borderWidth: 2,
      borderRadius: 200,
      borderColor: params?.expanded ? '#4561DB40' : 'transparent',
    },
    expandCta: {
      backgroundColor: params?.expanded ? '#6E91EC' : colors.background,
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ml14: { marginLeft: 14 },
    borderContainer: {
      height: 2,
      overflow: 'hidden',
      backgroundColor: colors.cardBackground,
    },
    border: {
      borderStyle: 'dashed',
      borderColor: '#FFFFFF',
      borderWidth: 2,
    },
    expandedContainer: {
      backgroundColor: '#F4F2F880',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    locationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    expandedActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  };
});
