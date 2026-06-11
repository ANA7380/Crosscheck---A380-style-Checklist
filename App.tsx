import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ChecklistItemRow } from './src/components/ChecklistItemRow';
import { ConfirmDialog } from './src/components/ConfirmDialog';
import { HamburgerButton } from './src/components/HamburgerButton';
import { SideMenu } from './src/components/SideMenu';
import { StatusBar } from './src/components/StatusBar';
import { useChecklists } from './src/hooks/useChecklists';
import { ECAM } from './src/theme/colors';
import { textStyles } from './src/theme/typography';

export default function App() {
  const {
    loading,
    state,
    activeChecklist,
    toggleItem,
    resetChecklist,
    addChecklist,
    deleteChecklist,
    renameChecklist,
    addItem,
    removeItem,
  } = useChecklists();

  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [pendingChecklistId, setPendingChecklistId] = useState<string | null>(null);

  const handleSelectChecklist = (id: string) => {
    setMenuOpen(false);
    setEditMode(false);
    setPendingChecklistId(id);
  };

  const handleConfirmReset = () => {
    if (pendingChecklistId) {
      resetChecklist(pendingChecklistId);
    }
    setPendingChecklistId(null);
  };

  const handleCancelReset = () => {
    setPendingChecklistId(null);
  };

  if (loading || !state || !activeChecklist) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={ECAM.cyan} />
        <Text style={styles.loadingText}>INITIALIZING ECAM...</Text>
      </View>
    );
  }

  const completed = activeChecklist.items.filter((i) => i.done).length;
  const total = activeChecklist.items.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ExpoStatusBar style="light" backgroundColor={ECAM.background} />

        <View style={styles.topBar}>
          <HamburgerButton onPress={() => setMenuOpen(true)} />
          <View style={styles.topBarCenter}>
            <Text style={styles.brand}>CROSSCHECK</Text>
            <Text style={styles.subBrand}>A380 ECAM</Text>
          </View>
          <View style={styles.topBarSpacer} />
        </View>

        <View style={styles.content}>
          <StatusBar
            title={activeChecklist.name}
            completed={completed}
            total={total}
          />

          {total === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>NO ITEMS IN CHECKLIST</Text>
              <Text style={styles.emptyHint}>USE CONFIG → EDIT CHECKLISTS</Text>
            </View>
          ) : (
            <FlatList
              data={activeChecklist.items}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <ChecklistItemRow
                  item={item}
                  index={index}
                  onToggle={() => toggleItem(activeChecklist.id, item.id)}
                />
              )}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.footerStrip}>
          <Text style={styles.footerText}>SYS · NORM</Text>
          <Text style={styles.footerText}>CHK · {new Date().toLocaleTimeString()}</Text>
        </View>

        <SideMenu
          visible={menuOpen}
          checklists={state.checklists}
          activeChecklistId={state.activeChecklistId}
          editMode={editMode}
          onClose={() => {
            setMenuOpen(false);
            setEditMode(false);
          }}
          onSelectChecklist={handleSelectChecklist}
          onEnterEditMode={() => setEditMode(true)}
          onExitEditMode={() => setEditMode(false)}
          onAddChecklist={addChecklist}
          onDeleteChecklist={deleteChecklist}
          onRenameChecklist={renameChecklist}
          onAddItem={addItem}
          onRemoveItem={removeItem}
        />

        <ConfirmDialog
          visible={pendingChecklistId !== null}
          title="RESET CONFIRMATION"
          message="Confirm Reset for Next Flight?"
          confirmLabel="RESET"
          cancelLabel="CANCEL"
          onConfirm={handleConfirmReset}
          onCancel={handleCancelReset}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: ECAM.background,
  },
  loading: {
    flex: 1,
    backgroundColor: ECAM.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    ...textStyles.small,
    color: ECAM.cyan,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  topBarCenter: {
    flex: 1,
    alignItems: 'center',
  },
  topBarSpacer: {
    width: 44,
  },
  brand: {
    ...textStyles.title,
    color: ECAM.cyan,
    fontSize: 16,
  },
  subBrand: {
    ...textStyles.small,
    color: ECAM.dimCyan,
    fontSize: 9,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    ...textStyles.label,
    color: ECAM.amber,
  },
  emptyHint: {
    ...textStyles.small,
    color: ECAM.dimCyan,
  },
  footerStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: ECAM.dimCyan,
    backgroundColor: ECAM.panelBg,
  },
  footerText: {
    ...textStyles.small,
    color: ECAM.dimCyan,
    fontSize: 10,
  },
});
