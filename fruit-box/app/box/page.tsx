'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { decodeConfig, SIZE_CONFIG, encodeConfig } from '@/lib/boxConfig';
import { getItemById } from '@/data/items';
import BoxGrid from '@/components/BoxGrid';
import SharePanel from '@/components/SharePanel';

function BoxView() {
  const searchParams = useSearchParams();
  const configParam = searchParams.get('config');

  if (!configParam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-gray-500">Бокс не найден</p>
        <Link href="/" className="text-sm underline">На главную</Link>
      </div>
    );
  }

  const config = decodeConfig(configParam);

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-gray-500">Не удалось загрузить бокс</p>
        <Link href="/" className="text-sm underline">На главную</Link>
      </div>
    );
  }

  const sizeInfo = SIZE_CONFIG[config.size];
  const editHref = `/constructor?config=${encodeConfig(config)}`;

  // Count items for summary
  const itemCounts: Record<string, number> = {};
  Object.values(config.cells).forEach((itemId) => {
    itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
          ← На главную
        </Link>
        <span className="text-sm font-semibold">Просмотр бокса</span>
        <div />
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Фруктовый бокс {config.size}</h1>
          <p className="text-gray-500 mt-1">
            {sizeInfo.label} · {sizeInfo.price.toLocaleString('ru-RU')}₸
          </p>
        </div>

        {/* Box preview */}
        <BoxGrid
          size={config.size}
          cells={config.cells}
          onCellClick={() => {}}
          readonly
        />

        {/* Items summary */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            Состав
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(itemCounts).map(([itemId, count]) => {
              const item = getItemById(itemId);
              if (!item) return null;
              return (
                <span
                  key={itemId}
                  className="flex items-center gap-1 border border-gray-200 rounded-full px-3 py-1 text-sm"
                >
                  <span>{item.emoji}</span>
                  <span>{item.name}</span>
                  {count > 1 && <span className="text-gray-400">×{count}</span>}
                </span>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <SharePanel config={config} />
          <Link
            href={editHref}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 text-sm font-medium hover:border-black transition-colors text-center"
          >
            ✏️ Изменить этот бокс
          </Link>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}

export default function BoxPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Загрузка...
        </div>
      }
    >
      <BoxView />
    </Suspense>
  );
}
