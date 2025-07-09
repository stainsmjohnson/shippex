import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CrossOutlined = () => {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path
        d="M13 1L1 13m12 0L1 1"
        stroke="#6E91EC"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};
