export type BoxSize = 'S' | 'M' | 'L';

export interface BoxConfig {
  size: BoxSize;
  cells: Record<string, string>; // cellId → itemId
}

export interface SizeInfo {
  rows: number;
  price: number;
  label: string;
  capacity: number;
}

export const SIZE_CONFIG: Record<BoxSize, SizeInfo> = {
  S: { rows: 2, price: 6000,  label: 'Маленький', capacity: 6  },
  M: { rows: 4, price: 9000,  label: 'Средний',   capacity: 12 },
  L: { rows: 6, price: 12000, label: 'Большой',   capacity: 18 },
};

// Ordered item ID list — index 0 = empty cell
// Order must match ALL_ITEMS in data/items.ts
export const ITEM_INDEX: string[] = [
  '',               // 0 = empty
  'pineapple',      // 1
  'strawberry',     // 2
  'kiwi',           // 3
  'blueberry',      // 4
  'banana',         // 5
  'dragonfruit',    // 6
  'mango',          // 7
  'grapes',         // 8
  'pomegranate',    // 9
  'tangerine',      // a (10)
  'macaron',        // b (11)
  'choco',          // c (12)
  'strawberry-sauce', // d (13)
  'coconut',        // e (14)
  'nuts',           // f (15)
  'granola',        // g (16)
  'vanilla',        // h (17)
];

const ITEM_TO_INDEX: Record<string, number> = Object.fromEntries(
  ITEM_INDEX.map((id, i) => [id, i])
);

// Returns all valid cell IDs for a given size
export function getCellIds(size: BoxSize) {
  const { rows } = SIZE_CONFIG[size];
  const left   = Array.from({ length: rows }, (_, i) => `left-${i}`);
  const center = Array.from({ length: rows }, (_, i) => `center-${i}`);
  const right  = Array.from({ length: rows }, (_, i) => `right-${i}`);
  return { left, center, right, all: [...left, ...center, ...right] };
}

/**
 * Compact encoding: "{S|M|L}{base36 char per cell}"
 * Example M box fully filled: "M253100c00315" (13 chars, URL-safe, no base64)
 * Cell order: left-0..N, center-0..N, right-0..N
 */
export function encodeConfig(config: BoxConfig): string {
  const { left, center, right } = getCellIds(config.size);
  const ordered = [...left, ...center, ...right];
  const chars = ordered.map((cellId) => {
    const itemId = config.cells[cellId] ?? '';
    const idx = ITEM_TO_INDEX[itemId] ?? 0;
    return idx.toString(36);
  });
  return config.size + chars.join('');
}

export function decodeConfig(encoded: string): BoxConfig | null {
  try {
    // Detect old base64-JSON format (legacy support)
    if (!['S', 'M', 'L'].includes(encoded[0])) {
      return decodeLegacy(encoded);
    }
    const size = encoded[0] as BoxSize;
    if (!SIZE_CONFIG[size]) return null;
    const { left, center, right } = getCellIds(size);
    const ordered = [...left, ...center, ...right];
    const chars = encoded.slice(1).split('');
    if (chars.length !== ordered.length) return null;
    const cells: Record<string, string> = {};
    chars.forEach((ch, i) => {
      const idx = parseInt(ch, 36);
      const itemId = ITEM_INDEX[idx];
      if (itemId) cells[ordered[i]] = itemId;
    });
    return { size, cells };
  } catch {
    return null;
  }
}

function decodeLegacy(encoded: string): BoxConfig | null {
  try {
    let json: string;
    if (typeof atob !== 'undefined') {
      json = decodeURIComponent(atob(encoded));
    } else {
      json = Buffer.from(encoded, 'base64').toString('utf-8');
    }
    const parsed = JSON.parse(json) as BoxConfig;
    if (!parsed.size || !parsed.cells) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function buildShareUrl(config: BoxConfig, origin: string): string {
  return `${origin}/box?c=${encodeConfig(config)}`;
}

export function formatWhatsAppMessage(
  config: BoxConfig,
  shareUrl: string,
  getItemById: (id: string) => { name: string; emoji: string } | undefined,
): string {
  const sizeInfo = SIZE_CONFIG[config.size];

  const itemCounts: Record<string, number> = {};
  Object.values(config.cells).forEach((itemId) => {
    itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
  });

  const lines: string[] = [
    'Привет! 👋 Хочу заказать фруктовый бокс:',
    '',
    `📦 Размер: ${config.size} (${sizeInfo.label}) — ${sizeInfo.price.toLocaleString('ru-RU')}₸`,
    '',
  ];

  Object.entries(itemCounts).forEach(([itemId, count]) => {
    const item = getItemById(itemId);
    if (item) {
      lines.push(`${item.emoji} ${item.name}${count > 1 ? ` ×${count}` : ''}`);
    }
  });

  lines.push('', `🔗 Мой бокс: ${shareUrl}`);
  return lines.join('\n');
}
