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

// Returns all valid cell IDs for a given size
export function getCellIds(size: BoxSize) {
  const { rows } = SIZE_CONFIG[size];
  const left   = Array.from({ length: rows }, (_, i) => `left-${i}`);
  const center = Array.from({ length: rows }, (_, i) => `center-${i}`);
  const right  = Array.from({ length: rows }, (_, i) => `right-${i}`);
  return { left, center, right, all: [...left, ...center, ...right] };
}

export function encodeConfig(config: BoxConfig): string {
  const json = JSON.stringify(config);
  if (typeof btoa !== 'undefined') {
    return btoa(encodeURIComponent(json));
  }
  return Buffer.from(json).toString('base64');
}

export function decodeConfig(encoded: string): BoxConfig | null {
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
  return `${origin}/box?config=${encodeConfig(config)}`;
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
