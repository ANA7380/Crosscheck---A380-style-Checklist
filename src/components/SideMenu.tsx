import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Checklist } from '../types/checklist';
import { ECAM } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { EditChecklistsPanel } from './EditChecklistsPanel';

interface SideMenuProps {
  visible: boolean;
  checklists: Checklist[];
  activeChecklistId: string;
  editMode: boolean;
  onClose: () => void;
  onSelectChecklist: (id: string) => void;
  onEnterEditMode: () => void;
  onExitEditMode: () => void;
  onAddChecklist: (name: string) => void;
  onDeleteChecklist: (id: string) => void;
  onRenameChecklist: (id: string, name: string) => void;
  onAddItem: (checklistId: string, label: string) => void;
  onRemoveItem: (checklistId: string, itemId: string) => void;
}

export function SideMenu({
  visible,
  checklists,
  activeChecklistId,
  editMode,
  onClose,
  onSelectChecklist,
  onEnterEditMode,
  onExitEditMode,
  onAddChecklist,
  onDeleteChecklist,
  onRenameChecklist,
  onAddItem,
  onRemoveItem,
}: SideMenuProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.drawer}>
          <View style={styles.drawerBorder}>
            {editMode ? (
              <EditChecklistsPanel
                checklists={checklists}
                onAddChecklist={onAddChecklist}
                onDeleteChecklist={onDeleteChecklist}
                onRenameChecklist={onRenameChecklist}
                onAddItem={onAddItem}
                onRemoveItem={onRemoveItem}
                onBack={onExitEditMode}
              />
            ) : (
              <>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>CONFIG</Text>
                  <Pressable onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeText}>✕</Text>
                  </Pressable>
                </View>

                <Text style={styles.sectionLabel}>SELECT CHECKLIST</Text>
                <ScrollView style={styles.list}>
                  {checklists.map((cl) => {
                    const active = cl.id === activeChecklistId;
                    const doneCount = cl.items.filter((i) => i.done).length;
                    return (
                      <Pressable
                        key={cl.id}
                        style={[styles.listItem, active && styles.listItemActive]}
                        onPress={() => onSelectChecklist(cl.id)}
                      >
                        <Text style={[styles.listItemName, active && styles.listItemNameActive]}>
                          {active ? '▸ ' : '  '}
                          {cl.name}
                        </Text>
                        <Text style={styles.listItemMeta}>
                          {doneCount}/{cl.items.length}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>

                <View style={styles.footer}>
                  <Pressable style={styles.editButton} onPress={onEnterEditMode}>
                    <Text style={styles.editButtonText}>EDIT CHECKLISTS</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  drawer: {
    width: '82%',
    maxWidth: 340,
    backgroundColor: ECAM.background,
  },
  drawerBorder: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: ECAM.cyan,
    padding: 16,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    ...textStyles.title,
    color: ECAM.cyan,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: ECAM.dimCyan,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: ECAM.cyan,
    fontSize: 16,
  },
  sectionLabel: {
    ...textStyles.small,
    color: ECAM.dimCyan,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A1A1A',
    padding: 12,
    marginBottom: 8,
    backgroundColor: ECAM.panelBg,
  },
  listItemActive: {
    borderColor: ECAM.cyan,
  },
  listItemName: {
    ...textStyles.label,
    color: ECAM.cyan,
    fontSize: 12,
    flex: 1,
  },
  listItemNameActive: {
    color: ECAM.green,
  },
  listItemMeta: {
    ...textStyles.small,
    color: ECAM.dimCyan,
    fontSize: 10,
  },
  footer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  editButton: {
    borderWidth: 2,
    borderColor: ECAM.amber,
    padding: 14,
    alignItems: 'center',
  },
  editButtonText: {
    ...textStyles.small,
    color: ECAM.amber,
  },
});
