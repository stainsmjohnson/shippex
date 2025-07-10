import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, SearchBar } from '../../components';
import { FilterOutlined, ScanSmallOutlined } from '../../../assets/svgs';
import { useShipments } from '../../../hooks';
import debounce from 'lodash/debounce';

export const HeaderActions = React.memo(
  ({ onFilter }: { onFilter: () => void }) => {
    const { setFilter } = useShipments();

    const [searchTerm, setSearchTerm] = useState('');

    const _search = useCallback(
      debounce((term: string) => {
        setFilter({ query: term });
      }, 200),
      [setFilter],
    );

    const _handleSearch = (term: string) => {
      _search(term);
      setSearchTerm(term);
    };

    return (
      <View style={styles.container}>
        <SearchBar
          value={searchTerm}
          placeholder="Search"
          onChangeText={_handleSearch}
        />
        <View style={styles.actions}>
          <Button
            title="Filters"
            type="gray"
            size="medium"
            style={styles.flex}
            onPress={onFilter}
            icon={<FilterOutlined />}
          />
          <Button
            title="Add Scan"
            type="primary"
            size="medium"
            style={[styles.flex, styles.ml8]}
            icon={<ScanSmallOutlined />}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  actions: { flexDirection: 'row', marginTop: 24 },
  flex: { flex: 1 },
  ml8: { marginLeft: 8 },
});
