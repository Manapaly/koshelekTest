'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { BoxItem } from '@/data/items';

interface Props {
  item: BoxItem;
}

export default function DraggableItem({ item }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: { item },
  });

  const style: React.CSSProperties = {
    touchAction: 'none',
    ...(transform ? { transform: CSS.Translate.toString(transform) } : {}),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={[
        'flex flex-col items-center gap-1 p-2 rounded-xl border cursor-grab active:cursor-grabbing',
        'border-gray-200 bg-white hover:border-black transition-all select-none',
        isDragging ? 'opacity-50 scale-95' : '',
      ].join(' ')}
      title={item.name}
    >
      <span className="text-2xl">{item.emoji}</span>
      <span className="text-xs text-center text-gray-600 leading-tight">{item.name}</span>
    </div>
  );
}
