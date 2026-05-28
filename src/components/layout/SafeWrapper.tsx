import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/utils/theme';

interface SafeWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  withBottomPad?: boolean;
}

export function SafeWrapper({ children, style, withBottomPad = true }: SafeWrapperProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.wrapper,
        withBottomPad && { paddingBottom: insets.bottom + 8 },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});
