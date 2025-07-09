import React from 'react';
import { ShipmentContext } from '../context';

export const useShipments = () => {
  const context = React.useContext(ShipmentContext);
  if (!context) {
    throw new Error('useShipments must be used within an ShipmentProvider');
  }
  return context;
};
