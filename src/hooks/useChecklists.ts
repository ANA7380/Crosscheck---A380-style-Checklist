import { useCallback, useEffect, useRef, useState } from 'react';
import { createDefaultState, generateId } from '../data/defaults';
import { loadAppState, saveAppState } from '../storage/persistence';
import { AppState, Checklist, ChecklistItem } from '../types/checklist';

export function useChecklists() {
  const [state, setState] = useState<AppState | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadAppState().then(setState);
  }, []);

  const persist = useCallback((next: AppState) => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(() => {
      saveAppState(next);
    }, 200);
  }, []);

  const update = useCallback(
    (updater: (prev: AppState) => AppState) => {
      setState((prev) => {
        if (!prev) return prev;
        const next = updater(prev);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const toggleItem = useCallback(
    (checklistId: string, itemId: string) => {
      update((prev) => ({
        ...prev,
        checklists: prev.checklists.map((cl) =>
          cl.id !== checklistId
            ? cl
            : {
                ...cl,
                items: cl.items.map((it) =>
                  it.id === itemId ? { ...it, done: !it.done } : it,
                ),
              },
        ),
      }));
    },
    [update],
  );

  const resetChecklist = useCallback(
    (checklistId: string) => {
      update((prev) => ({
        ...prev,
        activeChecklistId: checklistId,
        checklists: prev.checklists.map((cl) =>
          cl.id !== checklistId
            ? cl
            : { ...cl, items: cl.items.map((it) => ({ ...it, done: false })) },
        ),
      }));
    },
    [update],
  );

  const setActiveChecklist = useCallback(
    (checklistId: string) => {
      update((prev) => ({ ...prev, activeChecklistId: checklistId }));
    },
    [update],
  );

  const addChecklist = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      const newList: Checklist = {
        id: generateId(),
        name: trimmed.toUpperCase(),
        items: [],
      };
      update((prev) => ({
        ...prev,
        checklists: [...prev.checklists, newList],
      }));
    },
    [update],
  );

  const deleteChecklist = useCallback(
    (checklistId: string) => {
      update((prev) => {
        const remaining = prev.checklists.filter((cl) => cl.id !== checklistId);
        if (!remaining.length) {
          return createDefaultState();
        }
        const activeChecklistId =
          prev.activeChecklistId === checklistId
            ? remaining[0].id
            : prev.activeChecklistId;
        return { checklists: remaining, activeChecklistId };
      });
    },
    [update],
  );

  const renameChecklist = useCallback(
    (checklistId: string, name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      update((prev) => ({
        ...prev,
        checklists: prev.checklists.map((cl) =>
          cl.id === checklistId ? { ...cl, name: trimmed.toUpperCase() } : cl,
        ),
      }));
    },
    [update],
  );

  const addItem = useCallback(
    (checklistId: string, label: string) => {
      const trimmed = label.trim();
      if (!trimmed) return;
      const newItem: ChecklistItem = {
        id: generateId(),
        label: trimmed.toUpperCase(),
        done: false,
      };
      update((prev) => ({
        ...prev,
        checklists: prev.checklists.map((cl) =>
          cl.id !== checklistId ? cl : { ...cl, items: [...cl.items, newItem] },
        ),
      }));
    },
    [update],
  );

  const removeItem = useCallback(
    (checklistId: string, itemId: string) => {
      update((prev) => ({
        ...prev,
        checklists: prev.checklists.map((cl) =>
          cl.id !== checklistId
            ? cl
            : { ...cl, items: cl.items.filter((it) => it.id !== itemId) },
        ),
      }));
    },
    [update],
  );

  const importState = useCallback(
    (newState: AppState) => {
      update(() => newState);
    },
    [update]
  );

  const activeChecklist =
    state?.checklists.find((cl) => cl.id === state.activeChecklistId) ?? null;

  return {
    loading: state === null,
    state,
    activeChecklist,
    toggleItem,
    resetChecklist,
    setActiveChecklist,
    addChecklist,
    deleteChecklist,
    renameChecklist,
    addItem,
    removeItem,
    importState,
  };
}
