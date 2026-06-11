import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChecklistItem } from '../types/checklist';
import { ECAM } from '../theme/colors';
import { textStyles } from '../theme/typography';

interface ChecklistItemRowProps {
  item: ChecklistItem;
  index: number;
  onToggle: () => void;
}

export function ChecklistItemRow({ item, index, onToggle }: ChecklistItemRowProps) {
  const color = item.done ? ECAM.green : ECAM.cyan;

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Text style={[styles.index, { color: ECAM.dimCyan }]}>
        {String(index + 1).padStart(2, '0')}
      </Text>
      <View style={[styles.statusBox, { borderColor: color }]}>
        <Text style={[styles.status, { color }]}>{item.done ? '■' : '□'}</Text>
      </View>
      <Text style={[styles.label, { color }, item.done && styles.labelDone]} numberOfLines={2}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  pressed: {
    backgroundColor: '#0D0D0D',
  },
  index: {
    ...textStyles.small,
    width: 28,
  },
  statusBox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  status: {
    ...textStyles.body,
    fontSize: 14,
  },
  label: {
    ...textStyles.body,
    flex: 1,
  },
  labelDone: {
    opacity: 0.9,
  },
});
