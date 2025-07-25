import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ScanOutlined = ({ color }: { color: string }) => {
  return (
    <Svg width={32} height={25} viewBox="0 0 32 25" fill="none">
      <Path
        d="M.785 0h4.722v1.226h-4.11v3.205H.172V.613C.171.276.447 0 .785 0zm4.003 4.181h2.128V20.82H4.788V4.18zm13.265 0h1.52V20.82h-1.52V4.18zm-2.945 0h1.14V20.82h-1.14V4.18zm-6.386 0h.647V20.82h-.647V4.18zm16.591 0h1.899V20.82h-1.899V4.18zm-3.934 0h2.128V20.82H21.38V4.18zm-10.204 0h2.128V20.82h-2.128V4.18zM1.398 20.57v3.205h4.109V25H.785a.613.613 0 01-.614-.613v-3.818h1.227zM26.81 0h4.405c.338 0 .613.276.613.613v3.818h-1.226V1.226H26.81V0zm5.018 20.569v3.818a.615.615 0 01-.613.613H26.81v-1.226h3.792v-3.205h1.226z"
        fill={color}
      />
    </Svg>
  );
};

export const ScanSmallOutlined = () => {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M8.05 1.4H3.783A2.133 2.133 0 001.65 3.533V7.8m6.4 12.8H3.783a2.133 2.133 0 01-2.133-2.133V14.2m12.8-12.8h4.267c1.178 0 2.133.955 2.133 2.133V7.8m0 6.4v4.267a2.133 2.133 0 01-2.133 2.133H14.45M1.65 11h19.2"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};
