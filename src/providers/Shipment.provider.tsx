import React, { useCallback, useMemo, useState } from 'react';
import {
  FiltersType,
  ShipmentContext,
  ShipmentContextType,
  ShipmentItemType,
} from '../context/Shipment.context';

import dummyShipments from '../data/shipments.json';

export const ShipmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shipments, setShipments] = useState<ShipmentItemType[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    query: '',
    statuses: [],
  });

  const setFilter = useCallback(
    (newFilters: Partial<FiltersType>) => {
      const allFilters = { ...filters, ...newFilters };

      setFilters(allFilters);
      const filteredShipments = dummyShipments?.filter(shipment => {
        const queryMatch =
          (allFilters.query &&
            shipment.label
              ?.toLowerCase()
              ?.includes(allFilters.query?.toLowerCase())) ||
          !allFilters.query;

        const statusMatch =
          (allFilters.statuses?.length > 0 &&
            allFilters.statuses?.includes(shipment?.status)) ||
          allFilters.statuses?.length === 0;

        return queryMatch && statusMatch;
      });

      setShipments(filteredShipments as ShipmentItemType[]);
    },
    [filters],
  );

  const fetch = useCallback(() => {
    setShipments(dummyShipments as ShipmentItemType[]);
  }, []);

  const value: ShipmentContextType = useMemo(
    () => ({
      shipments,
      filters,
      setFilter,
      fetch,
    }),
    [shipments, filters, setFilter, fetch],
  );

  return (
    <ShipmentContext.Provider value={value}>
      {children}
    </ShipmentContext.Provider>
  );
};
