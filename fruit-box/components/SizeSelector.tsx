'use client';

import { BoxSize, SIZE_CONFIG } from '@/lib/boxConfig';

interface Props {
  value: BoxSize;
  onChange: (size: BoxSize) => void;
}

const SIZES: BoxSize[] = ['S', 'M', 'L'];

export default function SizeSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {SIZES.map((size) => {
        const info = SIZE_CONFIG[size];
        const isActive = value === size;
        return (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={[
              'flex flex-col items-center gap-1 border rounded-xl px-5 py-3 transition-all cursor-pointer',
              isActive
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white text-black hover:border-black',
            ].join(' ')}
          >
            <span className="text-xl font-bold">{size}</span>
            <span className="text-xs opacity-70">{info.label}</span>
            <span className="text-sm font-medium">
              {info.price.toLocaleString('ru-RU')}₸
            </span>
          </button>
        );
      })}
    </div>
  );
}
