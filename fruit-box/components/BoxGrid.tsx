'use client';

import { BoxSize, getCellIds } from '@/lib/boxConfig';
import { getItemById } from '@/data/items';
import BoxCell from './BoxCell';

interface Props {
  size: BoxSize;
  cells: Record<string, string>;
  onCellClick: (cellId: string) => void;
  highlightEmpty?: boolean;
  readonly?: boolean;
}

export default function BoxGrid({ size, cells, onCellClick, highlightEmpty = false, readonly = false }: Props) {
  const { left, center, right } = getCellIds(size);
  const totalCells = left.length * 3;
  const filledCount = Object.keys(cells).length;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm w-full max-w-xs mx-auto">
      {/* Column labels */}
      <div className="grid grid-cols-3 gap-2 mb-2 text-center">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Фрукты</span>
        <span className="text-xs text-gray-400 uppercase tracking-wide">Соусы</span>
        <span className="text-xs text-gray-400 uppercase tracking-wide">Добавки</span>
      </div>

      {/* Grid rows */}
      <div className="grid grid-cols-3 gap-2">
        {left.map((leftId, i) => (
          <>
            <BoxCell
              key={leftId}
              id={leftId}
              item={getItemById(cells[leftId])}
              isCenter={false}
              onCellClick={readonly ? () => {} : onCellClick}
              highlightEmpty={highlightEmpty}
            />
            <BoxCell
              key={center[i]}
              id={center[i]}
              item={getItemById(cells[center[i]])}
              isCenter={true}
              onCellClick={readonly ? () => {} : onCellClick}
              highlightEmpty={highlightEmpty}
            />
            <BoxCell
              key={right[i]}
              id={right[i]}
              item={getItemById(cells[right[i]])}
              isCenter={false}
              onCellClick={readonly ? () => {} : onCellClick}
              highlightEmpty={highlightEmpty}
            />
          </>
        ))}
      </div>

      {/* Fill counter */}
      {!readonly && (
        <div className="mt-3 text-center text-xs text-gray-400">
          {filledCount} / {totalCells} ячеек заполнено
        </div>
      )}
    </div>
  );
}
