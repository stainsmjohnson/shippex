export const routes = {
  SPLASH: 'SPLASH',
  PRELOGIN: 'PRELOGIN',
  LOGIN: 'LOGIN',
  TABS: 'TABS',
  PROFILE: 'PROFILE',
  SCAN: 'SCAN',
  SHIPMENTS: 'SHIPMENTS',
  WALLET: 'WALLET',
} as const;

export type RouteNames = (typeof routes)[keyof typeof routes];

export type RouteParams = {
  [routes.SPLASH]: undefined;
  [routes.PRELOGIN]: undefined;
  [routes.LOGIN]: undefined;
  [routes.TABS]: undefined;
  [routes.PROFILE]: undefined;
  [routes.SCAN]: undefined;
  [routes.SHIPMENTS]: undefined;
  [routes.WALLET]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RouteParams {}
  }
}
