'use client';

import { useDroppable } from '@dnd-kit/core';
import { BoxItem } from '@/data/items';

interface Props {
  id: string;
  item: BoxItem | undefined;
  isCenter?: boolean;
  onCellClick: (cellId: string) => void;
  highlightEmpty?: boolean;
}

export default function BoxCell({ id, item, isCenter = false, onCellClick, highlightEmpty = false }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const shape = isCenter ? 'rounded-full aspect-square' : 'rounded-xl aspect-square';

  return (
    <div
      ref={setNodeRef}
      onClick={() => onCellClick(id)}
      className={[
        shape,
        'flex items-center justify-center border text-3xl select-none transition-all cursor-pointer',
        item
          ? 'border-black bg-white hover:bg-red-50 hover:border-red-300'
          : highlightEmpty
          ? 'border-black border-dashed bg-black/5'
          : 'border-dashed border-gray-300 bg-gray-50 hover:border-gray-400',
        isOver ? 'border-black bg-gray-100 scale-105' : '',
      ].join(' ')}
      title={item ? `${item.name} — нажми чтобы удалить` : 'Нажми или перетащи'}
    >
      {item ? (
        <span>{item.emoji}</span>
      ) : (
        <span className={`text-xl ${highlightEmpty ? 'text-black' : 'text-gray-300'}`}>+</span>
      )}
    </div>
  );
}
