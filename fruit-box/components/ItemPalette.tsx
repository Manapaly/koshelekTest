'use client';

import { useState } from 'react';
import { FRUITS, TOPPINGS, BoxItem } from '@/data/items';
import DraggableItem from './DraggableItem';

type Tab = 'fruits' | 'toppings';

interface Props {
  selectedItemId?: string;
  onItemClick?: (item: BoxItem) => void;
}

export default function ItemPalette({ selectedItemId, onItemClick }: Props) {
  const [tab, setTab] = useState<Tab>('fruits');
  const items = tab === 'fruits' ? FRUITS : TOPPINGS;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Tabs */}
      <div className="flex border border-gray-200 rounded-xl p-1 gap-1">
        {(['fruits', 'toppings'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              'flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer',
              tab === t ? 'bg-black text-white' : 'text-gray-500 hover:text-black',
            ].join(' ')}
          >
            {t === 'fruits' ? '🍓 Фрукты' : '🍫 Топпинги'}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className={[
              'cursor-pointer rounded-xl transition-all',
              selectedItemId === item.id ? 'ring-2 ring-black scale-105' : '',
            ].join(' ')}
          >
            <DraggableItem item={item} />
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center">
        Перетащи в ячейку <strong>или</strong> нажми на ингредиент, затем на ячейку
      </p>
    </div>
  );
}
