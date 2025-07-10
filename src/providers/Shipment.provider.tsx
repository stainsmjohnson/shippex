import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FiltersType,
  ShipmentContext,
  ShipmentContextType,
  ShipmentItemType,
} from '../context/Shipment.context';
import * as ShipmentService from '../services/shipments';

export const ShipmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const allShipments = useRef<ShipmentItemType[]>([]);
  const [shipments, setShipments] = useState<ShipmentItemType[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    query: '',
    statuses: [],
  });

  const setFilter = useCallback(
    (newFilters: Partial<FiltersType>) => {
      const allFilters = { ...filters, ...newFilters };

      setFilters(allFilters);
      const filteredShipments = allShipments.current?.filter(shipment => {
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

  const fetch = useCallback(async () => {
    setLoading(true);
    const [failure, data] = await ShipmentService.getShipments();

    if (failure) {
      setError(failure?.message);
      setLoading(false);
      return;
    }

    allShipments.current = data;
    setShipments(data as ShipmentItemType[]);
    setLoading(false);
  }, []);

  const value: ShipmentContextType = useMemo(
    () => ({
      shipments,
      filters,
      setFilter,
      fetch,
      loading,
      error,
    }),
    [shipments, filters, setFilter, fetch, loading, error],
  );

  return (
    <ShipmentContext.Provider value={value}>
      {children}
    </ShipmentContext.Provider>
  );
};
