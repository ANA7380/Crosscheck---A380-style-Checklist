import { Platform, TextStyle } from 'react-native';

const monoFamily = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export const fonts = {
  mono: monoFamily,
} as const;

export const textStyles = {
  title: {
    fontFamily: monoFamily,
    fontSize: 18,
    fontWeight: '700' as const,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  label: {
    fontFamily: monoFamily,
    fontSize: 13,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: monoFamily,
    fontSize: 15,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  small: {
    fontFamily: monoFamily,
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
} satisfies Record<string, TextStyle>;
