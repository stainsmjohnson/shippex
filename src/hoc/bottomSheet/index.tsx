import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  ComponentType,
} from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface BottomSheetRef {
  show: () => void;
  dismiss: () => void;
}

export const BottomSheet = forwardRef<BottomSheetRef, PropsWithChildren>(
  ({ children }, ref) => {
    const tabBarHeight = useBottomTabBarHeight();
    const isOpen = useSharedValue(false);
    const height = useSharedValue(0);
    const progress = useSharedValue(0);

    const show = useCallback(() => {
      isOpen.value = true;

      progress.value = withTiming(1, { duration: 200 });
    }, [progress, isOpen]);

    const dismiss = useCallback(() => {
      isOpen.value = false;

      progress.value = withTiming(0, { duration: 200 });
    }, [progress, isOpen]);

    useImperativeHandle(
      ref,
      () => ({
        show,
        dismiss,
      }),
      [show, dismiss],
    );

    const sheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: (1 - progress.value) * 2 * height.value }],
    }));

    const backdropStyle = useAnimatedStyle(() => ({
      opacity: progress.value,
      zIndex: isOpen.value
        ? 1
        : withDelay(200, withTiming(-1, { duration: 0 })),
    }));

    return (
      <>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <TouchableOpacity style={styles.flex} onPress={dismiss} />
        </Animated.View>
        <Animated.View
          onLayout={e => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={[styles.sheet, sheetStyle]}
        >
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </>
    );
  },
);

export const withBottomSheet = <T extends Record<string, any>>(
  Component: ComponentType<T>,
) => {
  return forwardRef<BottomSheetRef, T>((props, ref) => {
    const _handleDismiss = () => {
      ref?.current?.dismiss();
    };

    return (
      <BottomSheet ref={ref}>
        <Component onDismiss={_handleDismiss} {...(props as T)} />
      </BottomSheet>
    );
  });
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  sheet: {
    padding: 16,
    paddingRight: 2,
    paddingLeft: 2,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    backgroundColor: '#f8f9ff',
  },
  handle: {
    width: 36,
    height: 5,
    backgroundColor: '#A7A3B3',
    borderRadius: 5,
    position: 'absolute',
    top: 6,
    alignSelf: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
