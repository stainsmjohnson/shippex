import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronRightOutlined = ({
  color = '#2F50C1',
  ...props
}: SvgProps) => {
  return (
    <Svg width={19} height={16} viewBox="0 0 19 16" fill="none" {...props}>
      <Path
        d="M10.833 1L17.5 8m0 0l-6.667 7M17.5 8h-16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
