import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#7C3AED',
  primaryDark: '#5B21B6',
  primaryDeep: '#4C1D95',
  primaryLight: '#A78BFA',
  primaryBg: '#EDE9FE',
  bg: '#F8F7FF',
  card: '#FFFFFF',
  text: '#1F2937',
  textSub: '#6B7280',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
};

export const FontSize = {
  micro: 9,
  caption: 12,
  bodySm: 13,
  body: 14,
  titleSm: 16,
  title: 18,
  heading: 22,
  display: 32,
};

export const FontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  sm: 8,
  chip: 10,
  listItem: 12,
  card: 16,
  xl: 24,
  full: 999,
};

export const Shadow = {
  card: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  cardSm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
};

export const Gradient = {
  header: ['#7C3AED', '#5B21B6', '#4C1D95'] as const,
};
