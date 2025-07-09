import React from 'react';

export type ShipmentItemType = {
  shipmentId: string;
  label: string;
  from: {
    city: string;
    address: string;
  };
  to: {
    city: string;
    address: string;
  };
  status: 'RECEIVED' | 'CANCELED' | 'DELIVERED' | 'ON_HOLD' | 'ERROR';
  phone: string;
};

export type FiltersType = {
  query: string;
  statuses: string[];
};

export type ShipmentContextType = {
  shipments: ShipmentItemType[];
  filters: FiltersType;
  setFilter: (filter: Partial<FiltersType>) => void;
  fetch: () => void;
};

export const ShipmentContext = React.createContext<ShipmentContextType>({
  shipments: [],
  filters: { query: '', statuses: [] },
  setFilter: () => {},
  fetch: () => null,
});
