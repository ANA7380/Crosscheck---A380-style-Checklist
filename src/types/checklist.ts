export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Checklist {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export interface AppState {
  checklists: Checklist[];
  activeChecklistId: string;
}
