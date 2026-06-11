import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ECAM } from '../theme/colors';
import { textStyles } from '../theme/typography';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = 'CONFIRM',
  cancelLabel = 'CANCEL',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.divider} />
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Pressable style={styles.button} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  panel: {
    width: '100%',
    maxWidth: 360,
    borderWidth: 2,
    borderColor: ECAM.amber,
    backgroundColor: ECAM.panelBg,
    padding: 16,
  },
  title: {
    ...textStyles.label,
    color: ECAM.amber,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: ECAM.dimCyan,
    marginBottom: 12,
  },
  message: {
    ...textStyles.body,
    color: ECAM.cyan,
    lineHeight: 22,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    borderWidth: 1,
    borderColor: ECAM.dimCyan,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  confirmButton: {
    borderColor: ECAM.amber,
  },
  cancelText: {
    ...textStyles.small,
    color: ECAM.cyan,
  },
  confirmText: {
    ...textStyles.small,
    color: ECAM.amber,
  },
});
