import React, { ComponentType } from 'react';
import { ShipmentProvider } from '../../providers';

export const withShipments = <T extends Record<string, any>>(
  Component: ComponentType<T>,
) => {
  return (props: T) => {
    return (
      <ShipmentProvider>
        <Component {...(props as T)} />
      </ShipmentProvider>
    );
  };
};
