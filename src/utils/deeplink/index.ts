import { Alert, Linking } from 'react-native';

const openDeeplink = async (
  url: string,
  errorMessage: string = 'Could not open',
) => {
  try {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  } catch (err) {
    Alert.alert(errorMessage);
    // Log into crash monitoring tool
    return null;
  }
};

const sendWhatsappMessage = async (
  phoneWithCountryCode: string,
  message: string = '',
) => {
  if (!phoneWithCountryCode) return null;

  const _message = encodeURIComponent(message);
  const url = `https://wa.me/${phoneWithCountryCode}?text=${_message}`;

  await openDeeplink(
    url,
    'Unable to open Whatsapp, make sure Whatsapp is installed',
  );
};

const openDiler = async (phoneNumber: string) => {
  if (!phoneNumber) return null;

  const url = `tel:${phoneNumber}`;

  await openDeeplink(url, 'Unable to open Dialer');
};

export const RedirectExternal = {
  Whatsapp: sendWhatsappMessage,
  Dialer: openDiler,
  Generic: openDeeplink,
};
