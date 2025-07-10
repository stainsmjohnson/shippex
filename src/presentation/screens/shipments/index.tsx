import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useAuth } from '../../../core/auth';
import { makeStyles } from '../../../core/theme';

import FilterSheet from '../../sheets/filters';
import { useShipments } from '../../../hooks';
import { withShipments } from '../../../hoc/shipment';
import { Shipments } from './Shipments';
import { Header } from './Header';
import { HeaderActions } from './HeaderActions';

const ShipmentScreen = () => {
  const { styles } = useStyles();
  const { user } = useAuth();
  const { fetch } = useShipments();

  const [filterSheetVisible, setFilterSheetVisible] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const _toggleFilter = () => setFilterSheetVisible(pre => !pre);

  return (
    <SafeAreaView style={styles.screen}>
      <Header imageUrl={user?.imageUrl ?? null} name={user?.name ?? null} />
      <HeaderActions onFilter={_toggleFilter} />
      <Shipments />
      <FilterSheet visible={filterSheetVisible} onDismiss={_toggleFilter} />
    </SafeAreaView>
  );
};

export default withShipments(ShipmentScreen);

const useStyles = makeStyles(({ colors }) => ({
  screen: { flex: 1, backgroundColor: colors.background },
}));
