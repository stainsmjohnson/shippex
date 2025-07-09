import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Upper = () => {
  return (
    <Svg width={37} height={12} viewBox="0 0 37 12" fill="none">
      <Path
        d="M36.114 0c0 3.311-1.344 6.31-3.518 8.484a11.956 11.956 0 01-8.28 3.513H0L12.055 0h24.059z"
        fill="#2F50C1"
      />
    </Svg>
  );
};

export const Lower = () => {
  return (
    <Svg width={37} height={23} viewBox="0 0 37 23" fill="none">
      <Path
        d="M36.15 10.91L24.002 23H.543v-.025l-.007-.004v-.043c0-.416.093-3.332 1.845-6.129.893-1.423 2.195-2.818 4.154-3.896 1.794-.986 5.579-1.904 8.694-1.887l-.093 3.98 4.704-4.494-4.496-4.706-.015.645-.079 3.382a18.663 18.663 0 00-4.21.32L1.064.207h24.331L36.15 10.91z"
        fill="#2F50C1"
      />
    </Svg>
  );
};
