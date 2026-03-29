import { BoxConfig } from '@/lib/boxConfig';

export interface Preset {
  id: string;
  name: string;
  description: string;
  emoji: string;
  config: BoxConfig;
}

export const PRESETS: Preset[] = [
  {
    id: 'classic',
    name: 'Классика',
    emoji: '🍓',
    description: 'Клубника, банан и киви с шоколадным соусом и орехами',
    config: {
      size: 'M',
      cells: {
        'left-0': 'strawberry',
        'left-1': 'banana',
        'left-2': 'kiwi',
        'left-3': 'strawberry',
        'center-0': 'choco',
        'center-1': 'nuts',
        'center-2': 'vanilla',
        'center-3': 'choco',
        'right-0': 'kiwi',
        'right-1': 'banana',
        'right-2': 'strawberry',
        'right-3': 'kiwi',
      },
    },
  },
  {
    id: 'exotic',
    name: 'Экзотика',
    emoji: '🥭',
    description: 'Манго, драгонфрут и ананас с кокосовой стружкой',
    config: {
      size: 'M',
      cells: {
        'left-0': 'mango',
        'left-1': 'dragonfruit',
        'left-2': 'pineapple',
        'left-3': 'mango',
        'center-0': 'coconut',
        'center-1': 'vanilla',
        'center-2': 'choco',
        'center-3': 'coconut',
        'right-0': 'dragonfruit',
        'right-1': 'pineapple',
        'right-2': 'mango',
        'right-3': 'pineapple',
      },
    },
  },
  {
    id: 'berries',
    name: 'Ягодный рай',
    emoji: '🫐',
    description: 'Черника, клубника и виноград с клубничным соусом',
    config: {
      size: 'M',
      cells: {
        'left-0': 'blueberry',
        'left-1': 'strawberry',
        'left-2': 'grapes',
        'left-3': 'blueberry',
        'center-0': 'strawberry-sauce',
        'center-1': 'vanilla',
        'center-2': 'strawberry-sauce',
        'center-3': 'coconut',
        'right-0': 'strawberry',
        'right-1': 'grapes',
        'right-2': 'blueberry',
        'right-3': 'strawberry',
      },
    },
  },
  {
    id: 'celebration',
    name: 'Праздничный',
    emoji: '🎉',
    description: 'Манго, клубника, черника с кокосом и гранолой — большой бокс',
    config: {
      size: 'L',
      cells: {
        'left-0': 'mango',
        'left-1': 'strawberry',
        'left-2': 'blueberry',
        'left-3': 'mango',
        'left-4': 'strawberry',
        'left-5': 'blueberry',
        'center-0': 'coconut',
        'center-1': 'granola',
        'center-2': 'vanilla',
        'center-3': 'choco',
        'center-4': 'strawberry-sauce',
        'center-5': 'coconut',
        'right-0': 'strawberry',
        'right-1': 'blueberry',
        'right-2': 'mango',
        'right-3': 'grapes',
        'right-4': 'pomegranate',
        'right-5': 'macaron',
      },
    },
  },
];
