import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSize, FontWeight, Radius, Spacing } from '@/utils/theme';

interface StatPillProps {
  icon: string;
  label: string;
  value: string;
}

export function StatPill({ icon, label, value }: StatPillProps) {
  return (
    <View style={styles.pill}>
      <Text style={styles.icon}>{icon}</Text>
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: Radius.chip,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 2,
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  icon: {
    fontSize: FontSize.body,
  },
  value: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  label: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
});
