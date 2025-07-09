import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BellOutlined = () => {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
      <Path
        d="M6.333 18.09c.708.566 1.643.91 2.667.91a4.268 4.268 0 002.667-.91m-10.16-2.908c-.421 0-.656-.663-.401-1.03.591-.854 1.163-2.107 1.163-3.615l.024-2.185C2.293 4.292 5.296 1 9 1c3.759 0 6.806 3.34 6.806 7.46l-.025 2.077c0 1.518.552 2.778 1.12 3.632.245.369.009 1.013-.408 1.013H1.508z"
        stroke="#2F50C1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
