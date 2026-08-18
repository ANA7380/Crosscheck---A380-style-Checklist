# Crosscheck — A380 ECAM Checklist

A reusable checklist (TODO) app for React Native, styled after the Airbus A380 ECAM cockpit display. Create master lists, check items off, and reset for your next trip with one confirmation.

## Features

- **ECAM cockpit theme** — pure black background, Airbus cyan unchecked items, Airbus green checked items, monospace avionics typography
- **Multiple checklists** — Before Work, Domestic Travel, International Travel (plus custom lists)
- **Config menu** — hamburger button opens a side drawer to switch checklists
- **Flight reset** — selecting any checklist prompts *"Confirm Reset for Next Flight?"* and clears all checkmarks
- **Edit mode** — add/delete checklists and add/remove items
- **Persistence** — checklist data and progress saved via AsyncStorage

## Requirements

- [Node.js](https://nodejs.org/) 18+
- [Expo Go](https://expo.dev/go) SDK 54 on your phone, or Android Studio / Xcode for emulators

## APK Install
- Download and install the `Install.apk`


## Setup

```bash
npm install
npx expo install --fix
npm start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `a` for Android emulator / `i` for iOS simulator.

## Build for Android

```bash
npx expo prebuild
npx expo run:android
```


## Project structure

```
App.tsx                 Main screen
src/
  components/           UI (menu, items, dialogs)
  data/defaults.ts      Default checklists
  hooks/useChecklists.ts State + persistence
  storage/persistence.ts AsyncStorage layer
  theme/                ECAM colors & typography
```

## Color reference

| Role              | Hex       |
|-------------------|-----------|
| Background        | `#000000` |
| Unchecked / text  | `#2BE0F9` |
| Checked           | `#39FF14` |
| Amber (warnings)  | `#FFB000` |


---
## Updates

### 2026.6.15

1. Better Scrolling, all info displays above keyboard
2. Delete checklist confirmation added
3. Import Export feature added
4. Switching checklist can choose to keep or reset checked items.


## Future Updates
1. Better icon
2. When item is checked, automatically place the checked items to the bottom of the checklist. Keeping the unchecked items on the top of the list
3. Simplified Chinese interface
