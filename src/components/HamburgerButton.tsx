import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ECAM } from '../theme/colors';

interface HamburgerButtonProps {
  onPress: () => void;
}

export function HamburgerButton({ onPress }: HamburgerButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Open configuration menu"
    >
      <View style={styles.line} />
      <View style={styles.line} />
      <View style={styles.line} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ECAM.cyan,
    backgroundColor: ECAM.panelBg,
  },
  pressed: {
    backgroundColor: '#111',
  },
  line: {
    width: 22,
    height: 2,
    backgroundColor: ECAM.cyan,
    marginVertical: 2,
  },
});
