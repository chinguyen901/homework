import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing } from '@/utils/theme';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  rightIcon?: React.ReactNode;
  showGreeting?: boolean;
}

export function AppHeader({ title, subtitle, rightIcon, showGreeting }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#7C3AED', '#5B21B6', '#4C1D95']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.header, { paddingTop: insets.top + Spacing.md }]}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          {showGreeting && (
            <Text style={styles.greeting}>Xin chào 👋</Text>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightIcon && (
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  greeting: {
    fontSize: FontSize.bodySm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  title: {
    fontSize: FontSize.heading,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  subtitle: {
    fontSize: FontSize.bodySm,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
