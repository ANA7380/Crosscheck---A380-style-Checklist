import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Checklist } from '../types/checklist';
import { ECAM } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { ConfirmDialog } from './ConfirmDialog';

interface EditChecklistsPanelProps {
  checklists: Checklist[];
  onAddChecklist: (name: string) => void;
  onDeleteChecklist: (id: string) => void;
  onRenameChecklist: (id: string, name: string) => void;
  onAddItem: (checklistId: string, label: string) => void;
  onRemoveItem: (checklistId: string, itemId: string) => void;
  onBack: () => void;
}

export function EditChecklistsPanel({
  checklists,
  onAddChecklist,
  onDeleteChecklist,
  onRenameChecklist,
  onAddItem,
  onRemoveItem,
  onBack,
}: EditChecklistsPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    checklists[0]?.id ?? null,
  );
  const [newListName, setNewListName] = useState('');
  const [newItemLabels, setNewItemLabels] = useState<Record<string, string>>({});
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleAddList = () => {
    if (!newListName.trim()) return;
    onAddChecklist(newListName);
    setNewListName('');
  };

  const handleAddItem = (checklistId: string) => {
    const label = newItemLabels[checklistId] ?? '';
    if (!label.trim()) return;
    onAddItem(checklistId, label);
    setNewItemLabels((prev) => ({ ...prev, [checklistId]: '' }));
  };

  const handleDeleteConfirm = () => {
    if (pendingDeleteId) {
      onDeleteChecklist(pendingDeleteId);
    }
    setPendingDeleteId(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← BACK</Text>
        </Pressable>
        <Text style={styles.headerTitle}>EDIT CHECKLISTS</Text>
      </View>

      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>NEW CHECKLIST</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={newListName}
              onChangeText={setNewListName}
              placeholder="CHECKLIST NAME"
              placeholderTextColor={ECAM.dimCyan}
              autoCapitalize="characters"
            />
            <Pressable style={styles.addButton} onPress={handleAddList}>
              <Text style={styles.addButtonText}>ADD</Text>
            </Pressable>
          </View>
        </View>

        {checklists.map((cl) => {
          const expanded = expandedId === cl.id;
          return (
            <View key={cl.id} style={styles.listCard}>
              <Pressable
                style={styles.listHeader}
                onPress={() => setExpandedId(expanded ? null : cl.id)}
              >
                <Text style={styles.listName}>{cl.name}</Text>
                <Text style={styles.chevron}>{expanded ? '▼' : '▶'}</Text>
              </Pressable>

              {expanded && (
                <View style={styles.listBody}>
                  <Text style={styles.fieldLabel}>RENAME</Text>
                  <TextInput
                    style={styles.input}
                    defaultValue={cl.name}
                    onEndEditing={(e) => onRenameChecklist(cl.id, e.nativeEvent.text)}
                    autoCapitalize="characters"
                  />

                  <Text style={[styles.fieldLabel, styles.itemsLabel]}>ITEMS</Text>
                  {cl.items.map((item) => (
                    <View key={item.id} style={styles.itemRow}>
                      <Text style={styles.itemLabel} numberOfLines={1}>
                        {item.label}
                      </Text>
                      <Pressable
                        onPress={() => onRemoveItem(cl.id, item.id)}
                        style={styles.removeButton}
                      >
                        <Text style={styles.removeText}>DEL</Text>
                      </Pressable>
                    </View>
                  ))}

                  <View style={styles.inputRow}>
                    <TextInput
                      style={[styles.input, styles.itemInput]}
                      value={newItemLabels[cl.id] ?? ''}
                      onChangeText={(text) =>
                        setNewItemLabels((prev) => ({ ...prev, [cl.id]: text }))
                      }
                      placeholder="NEW ITEM"
                      placeholderTextColor={ECAM.dimCyan}
                      autoCapitalize="characters"
                    />
                    <Pressable
                      style={styles.addButton}
                      onPress={() => handleAddItem(cl.id)}
                    >
                      <Text style={styles.addButtonText}>ADD</Text>
                    </Pressable>
                  </View>

                  <Pressable
                    style={styles.deleteListButton}
                    onPress={() => setPendingDeleteId(cl.id)}
                  >
                    <Text style={styles.deleteListText}>DELETE CHECKLIST</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <ConfirmDialog
        visible={pendingDeleteId !== null}
        title="DELETE CHECKLIST"
        message="Are you sure you want to delete this checklist?"
        confirmLabel="DELETE"
        cancelLabel="CANCEL"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPendingDeleteId(null)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 8,
  },
  backText: {
    ...textStyles.small,
    color: ECAM.cyan,
  },
  headerTitle: {
    ...textStyles.title,
    color: ECAM.amber,
  },
  scroll: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  sectionLabel: {
    ...textStyles.small,
    color: ECAM.dimCyan,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: ECAM.dimCyan,
    backgroundColor: '#050505',
    color: ECAM.cyan,
    ...textStyles.body,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  itemInput: {
    flex: 1,
  },
  addButton: {
    borderWidth: 1,
    borderColor: ECAM.cyan,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  addButtonText: {
    ...textStyles.small,
    color: ECAM.cyan,
  },
  listCard: {
    borderWidth: 1,
    borderColor: ECAM.dimCyan,
    marginBottom: 12,
    backgroundColor: ECAM.panelBg,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  listName: {
    ...textStyles.label,
    color: ECAM.cyan,
    flex: 1,
  },
  chevron: {
    color: ECAM.dimCyan,
    fontSize: 12,
  },
  listBody: {
    padding: 12,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  fieldLabel: {
    ...textStyles.small,
    color: ECAM.dimCyan,
    marginBottom: 6,
    marginTop: 8,
  },
  itemsLabel: {
    marginTop: 14,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  itemLabel: {
    ...textStyles.body,
    color: ECAM.cyan,
    flex: 1,
    fontSize: 13,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: ECAM.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeText: {
    ...textStyles.small,
    color: ECAM.danger,
    fontSize: 10,
  },
  deleteListButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: ECAM.danger,
    padding: 10,
    alignItems: 'center',
  },
  deleteListText: {
    ...textStyles.small,
    color: ECAM.danger,
  },
});
