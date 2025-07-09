import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CheckMarkFilled = ({ color }: { color: string }) => {
  return (
    <Svg width={11} height={8} viewBox="0 0 11 8" fill="none">
      <Path
        d="M9.5 1L4 6.5 1.5 4"
        stroke={color}
        strokeWidth={1.6666}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
