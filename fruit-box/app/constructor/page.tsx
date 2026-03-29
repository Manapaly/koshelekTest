'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Link from 'next/link';

import { BoxSize, BoxConfig, decodeConfig, getCellIds } from '@/lib/boxConfig';
import { BoxItem, getItemById } from '@/data/items';
import SizeSelector from '@/components/SizeSelector';
import BoxGrid from '@/components/BoxGrid';
import ItemPalette from '@/components/ItemPalette';
import SharePanel from '@/components/SharePanel';

function Constructor() {
  const searchParams = useSearchParams();
  const [size, setSize] = useState<BoxSize>('M');
  const [cells, setCells] = useState<Record<string, string>>({});
  const [activeItem, setActiveItem] = useState<BoxItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<BoxItem | null>(null);

  // Load preset/shared config from URL on mount
  useEffect(() => {
    const configParam = searchParams.get('config');
    if (configParam) {
      const config = decodeConfig(configParam);
      if (config) {
        setSize(config.size);
        setCells(config.cells);
      }
    }
  }, [searchParams]);

  // When size changes, strip cells that no longer exist in new size
  const handleSizeChange = useCallback((newSize: BoxSize) => {
    const { all } = getCellIds(newSize);
    const validIds = new Set(all);
    setCells((prev) => {
      const next: Record<string, string> = {};
      Object.entries(prev).forEach(([k, v]) => {
        if (validIds.has(k)) next[k] = v;
      });
      return next;
    });
    setSize(newSize);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const item = getItemById(event.active.id as string);
    setActiveItem(item || null);
    setSelectedItem(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);
    if (!over) return;
    const itemId = active.id as string;
    const cellId = over.id as string;
    const { all } = getCellIds(size);
    if (all.includes(cellId)) {
      setCells((prev) => ({ ...prev, [cellId]: itemId }));
    }
  };

  // Cell click: if item selected → place; else → remove
  const handleCellClick = useCallback((cellId: string) => {
    if (selectedItem) {
      setCells((prev) => ({ ...prev, [cellId]: selectedItem.id }));
      setSelectedItem(null);
    } else {
      setCells((prev) => {
        const next = { ...prev };
        delete next[cellId];
        return next;
      });
    }
  }, [selectedItem]);

  // Palette item click: toggle selection
  const handleItemClick = useCallback((item: BoxItem) => {
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  }, []);

  const config: BoxConfig = { size, cells };
  const filledCount = Object.keys(cells).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
          ← Назад
        </Link>
        <span className="text-sm font-semibold tracking-tight">Конструктор бокса</span>
        <button
          onClick={() => setCells({})}
          className="text-sm text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          Очистить
        </button>
      </header>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-8">

          {/* Step 1: Size */}
          <section>
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
              Шаг 1 — Размер
            </h2>
            <SizeSelector value={size} onChange={handleSizeChange} />
          </section>

          {/* Step 2: Box grid */}
          <section>
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
              Шаг 2 — Собери свой бокс
            </h2>

            {/* Selected item hint */}
            {selectedItem && (
              <div className="mb-3 flex items-center gap-2 text-sm bg-black text-white rounded-xl px-3 py-2">
                <span>{selectedItem.emoji}</span>
                <span className="flex-1">{selectedItem.name} — нажми на ячейку</span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-300 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <BoxGrid
              size={size}
              cells={cells}
              onCellClick={handleCellClick}
              highlightEmpty={!!selectedItem}
            />
          </section>

          {/* Step 3: Ingredients */}
          <section>
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
              Шаг 3 — Ингредиенты
            </h2>
            <ItemPalette
              selectedItemId={selectedItem?.id}
              onItemClick={handleItemClick}
            />
          </section>

          {/* Step 4: Order */}
          {filledCount > 0 && (
            <section>
              <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                Шаг 4 — Оформить заказ
              </h2>
              <SharePanel config={config} />
            </section>
          )}

          <div className="h-8" />
        </div>

        {/* Drag overlay */}
        <DragOverlay>
          {activeItem && (
            <div className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-black bg-white shadow-2xl">
              <span className="text-3xl">{activeItem.emoji}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default function ConstructorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Загрузка...
        </div>
      }
    >
      <Constructor />
    </Suspense>
  );
}
