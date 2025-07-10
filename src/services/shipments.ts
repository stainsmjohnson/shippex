import { NetworkHandlerMocked } from './core';

export const getShipments = async () => {
  try {
    const response = await NetworkHandlerMocked.post('shipments');
    return [null, response?.data];
  } catch (err) {
    return [err, null];
  }
};
