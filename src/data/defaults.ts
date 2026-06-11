import { AppState } from '../types/checklist';

function item(label: string, done = false) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    label,
    done,
  };
}

function checklist(name: string, labels: string[]): AppState['checklists'][number] {
  return {
    id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    items: labels.map((label) => item(label)),
  };
}

export function createDefaultState(): AppState {
  const checklists = [
    checklist('Before Work', [
      'LAPTOP CHARGED',
      'BADGE / ACCESS CARD',
      'MEETING NOTES READY',
      'EMAIL CLEARED',
      'WATER BOTTLE',
    ]),
    checklist('Domestic Travel', [
      'GOVERNMENT ID',
      'BOARDING PASS',
      'PHONE CHARGER',
      'HEADPHONES',
      'SNACKS',
      'HOTEL CONFIRMATION',
    ]),
    checklist('International Travel', [
      'PASSPORT (6+ MO VALID)',
      'VISA / ENTRY DOCS',
      'TRAVEL INSURANCE',
      'CURRENCY / CARDS',
      'POWER ADAPTER',
      'ROAMING / eSIM',
      'COPIES OF DOCUMENTS',
    ]),
  ];

  return {
    checklists,
    activeChecklistId: checklists[0].id,
  };
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
