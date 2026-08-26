/**
 * Shared visual tokens for Alana & Victoria Languages.
 *
 * This file intentionally supports both the newer nested theme API
 * (Colors.light / Colors.dark, Radius) and the legacy flat API used by
 * several existing screens (Colors.primary, BorderRadius.lg, etc.).
 */

import '@/global.css';

import { Platform } from 'react-native';

const lightColors = {
  text: '#0F2F63',
  background: '#EAF7FF',
  backgroundElement: '#FFFFFF',
  backgroundSelected: '#E8F1FF',
  textSecondary: '#607A90',
} as const;

const darkColors = {
  text: '#FFFFFF',
  background: '#0B1F3A',
  backgroundElement: '#162A46',
  backgroundSelected: '#213B61',
  textSecondary: '#B9CBE0',
} as const;

export const Colors = {
  // Flat tokens kept for compatibility with existing feature screens.
  primary: '#168DFF',
  secondary: '#7C49FF',
  accent: '#FF2F98',
  success: '#26C96D',
  warning: '#FFB400',
  error: '#E5484D',
  text: '#0F2F63',
  textSecondary: '#607A90',
  background: '#EAF7FF',
  surface: '#FFFFFF',
  border: '#D7E9FF',
  muted: '#F3F8FC',

  // Theme variants used by the original Expo starter hooks/components.
  light: lightColors,
  dark: darkColors,
} as const;

export type ThemeColor = keyof typeof lightColors & keyof typeof darkColors;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BorderRadius = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  full: 999,
  pill: 999,
} as const;

// Newer name retained as an alias so both APIs work.
export const Radius = BorderRadius;

export const Breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const Theme = {
  colors: Colors,
  fonts: Fonts,
  spacing: Spacing,
  radius: BorderRadius,
  breakpoints: Breakpoints,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1500;
