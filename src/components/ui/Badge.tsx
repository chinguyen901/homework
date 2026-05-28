import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/utils/theme';

type BadgeVariant = 'trend' | 'hot' | 'new' | 'live' | 'success' | 'danger';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  trend: { bg: Colors.primaryBg, color: Colors.primary },
  hot: { bg: '#FEF3C7', color: '#D97706' },
  new: { bg: Colors.primaryBg, color: Colors.primary },
  live: { bg: '#DCFCE7', color: '#16A34A' },
  success: { bg: '#DCFCE7', color: Colors.success },
  danger: { bg: '#FEE2E2', color: Colors.danger },
};

export function Badge({ label, variant = 'trend' }: BadgeProps) {
  const vs = variantStyles[variant];
  return (
    <View style={[styles.badge, { backgroundColor: vs.bg }]}>
      <Text style={[styles.label, { color: vs.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  label: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semibold,
  },
});
