import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ECAM } from '../theme/colors';
import { textStyles } from '../theme/typography';

interface StatusBarProps {
  title: string;
  completed: number;
  total: number;
}

export function StatusBar({ title, completed, total }: StatusBarProps) {
  const allDone = total > 0 && completed === total;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sysLabel}>ECAM · STATUS</Text>
        <Text style={[styles.status, allDone && styles.statusComplete]}>
          {allDone ? 'COMPLETE' : 'IN PROGRESS'}
        </Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>ITEMS</Text>
        <Text style={styles.progressValue}>
          {completed}/{total}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: total ? `${(completed / total) * 100}%` : '0%',
              backgroundColor: allDone ? ECAM.green : ECAM.cyan,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: ECAM.cyan,
    backgroundColor: ECAM.panelBg,
    padding: 12,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sysLabel: {
    ...textStyles.small,
    color: ECAM.dimCyan,
  },
  status: {
    ...textStyles.small,
    color: ECAM.amber,
  },
  statusComplete: {
    color: ECAM.green,
  },
  title: {
    ...textStyles.title,
    color: ECAM.cyan,
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    ...textStyles.small,
    color: ECAM.dimCyan,
  },
  progressValue: {
    ...textStyles.small,
    color: ECAM.cyan,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#1A1A1A',
  },
  progressFill: {
    height: 4,
  },
});
