export type ItemType = 'fruit' | 'topping';

export interface BoxItem {
  id: string;
  name: string;
  emoji: string;
  type: ItemType;
  image?: string; // placeholder for future 3D photo
}

export const FRUITS: BoxItem[] = [
  { id: 'pineapple',   name: 'Ананас',     emoji: '🍍', type: 'fruit' },
  { id: 'strawberry',  name: 'Клубника',   emoji: '🍓', type: 'fruit' },
  { id: 'kiwi',        name: 'Киви',       emoji: '🥝', type: 'fruit' },
  { id: 'blueberry',   name: 'Черника',    emoji: '🫐', type: 'fruit' },
  { id: 'banana',      name: 'Банан',      emoji: '🍌', type: 'fruit' },
  { id: 'dragonfruit', name: 'Драгонфрут', emoji: '🐉', type: 'fruit' },
  { id: 'mango',       name: 'Манго',      emoji: '🥭', type: 'fruit' },
  { id: 'grapes',      name: 'Виноград',   emoji: '🍇', type: 'fruit' },
  { id: 'pomegranate', name: 'Гранат',     emoji: '❤️', type: 'fruit' },
  { id: 'tangerine',   name: 'Мандарин',   emoji: '🍊', type: 'fruit' },
  { id: 'macaron',     name: 'Макарон',    emoji: '🍬', type: 'fruit' },
];

export const TOPPINGS: BoxItem[] = [
  { id: 'choco',           name: 'Шоколадный соус',   emoji: '🍫', type: 'topping' },
  { id: 'strawberry-sauce',name: 'Клубничный соус',   emoji: '🍓', type: 'topping' },
  { id: 'coconut',         name: 'Кокосовая стружка', emoji: '🥥', type: 'topping' },
  { id: 'nuts',            name: 'Орехи',             emoji: '🥜', type: 'topping' },
  { id: 'granola',         name: 'Гранола',           emoji: '🌾', type: 'topping' },
  { id: 'vanilla',         name: 'Ванильный крем',    emoji: '🍦', type: 'topping' },
];

export const ALL_ITEMS: BoxItem[] = [...FRUITS, ...TOPPINGS];

export function getItemById(id: string): BoxItem | undefined {
  return ALL_ITEMS.find((item) => item.id === id);
}
