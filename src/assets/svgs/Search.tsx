import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const SearchOutlined = ({ color = '#A7A3B3' }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M14.927 15.04L18.4 18.4m-1.12-8.96a7.84 7.84 0 11-15.68 0 7.84 7.84 0 0115.68 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};
