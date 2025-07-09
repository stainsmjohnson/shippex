import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  ComponentType,
  useEffect,
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

export const BottomSheet = forwardRef<
  BottomSheetRef,
  PropsWithChildren<{ visible: boolean; onDismiss: () => void }>
>(({ children, visible, onDismiss }, ref) => {
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

  useEffect(() => {
    if (visible) show();
    else dismiss();
  }, [visible, show, dismiss]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * 2 * height.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    zIndex: isOpen.value ? 1 : withDelay(200, withTiming(-1, { duration: 0 })),
  }));

  const _handleDismiss = () => {
    if (onDismiss) {
      return onDismiss?.();
    }

    return dismiss();
  };

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={styles.flex} onPress={_handleDismiss} />
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
});

export const withBottomSheet = <T extends Record<string, any>>(
  Component: ComponentType<T>,
) => {
  return forwardRef<BottomSheetRef, T>((props, ref) => {
    const _handleDismiss = () => {
      if (props.onDismiss) {
        return props.onDismiss?.();
      }

      return ref?.current?.dismiss();
    };

    return (
      <BottomSheet
        ref={ref}
        visible={props?.visible}
        onDismiss={props.onDismiss}
      >
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
