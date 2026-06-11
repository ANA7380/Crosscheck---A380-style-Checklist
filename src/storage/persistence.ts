import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '../types/checklist';
import { createDefaultState } from '../data/defaults';

const STORAGE_KEY = '@crosscheck/app_state';

export async function loadAppState(): Promise<AppState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultState();
    }
    const parsed = JSON.parse(raw) as AppState;
    if (
      !parsed.checklists?.length ||
      !parsed.activeChecklistId ||
      !parsed.checklists.some((c) => c.id === parsed.activeChecklistId)
    ) {
      return createDefaultState();
    }
    return parsed;
  } catch {
    return createDefaultState();
  }
}

export async function saveAppState(state: AppState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
