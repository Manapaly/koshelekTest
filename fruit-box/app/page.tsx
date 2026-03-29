import Link from 'next/link';
import { PRESETS } from '@/data/presets';
import { encodeConfig } from '@/lib/boxConfig';
import { getItemById } from '@/data/items';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-8 text-center">
        <span className="text-2xl font-bold tracking-tight">🍓 FruitBox</span>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {PRESETS.slice(0, 3).map((preset) => {
          const encoded = encodeConfig(preset.config);
          const href = `/constructor?config=${encoded}`;

          // Top 4 unique items for preview
          const uniqueItems = [...new Set(Object.values(preset.config.cells))]
            .map(getItemById)
            .filter(Boolean)
            .slice(0, 4);

          return (
            <Link
              key={preset.id}
              href={href}
              className="group aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white hover:border-black transition-all hover:shadow-sm p-4 text-center"
            >
              {/* Emoji grid preview — placeholder for future 3D photos */}
              <div className="grid grid-cols-2 gap-1">
                {uniqueItems.map((item) => item && (
                  <span key={item.id} className="text-2xl leading-none">{item.emoji}</span>
                ))}
              </div>
              <span className="text-xs font-semibold text-black mt-1">{preset.name}</span>
              <span className="text-xs text-gray-400">Нажми чтобы собрать</span>
            </Link>
          );
        })}

        {/* 4th tile — build your own */}
        <Link
          href="/constructor"
          className="group aspect-square flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-black bg-black text-white transition-all hover:bg-gray-800 p-4 text-center"
        >
          <span className="text-3xl">✦</span>
          <span className="text-sm font-semibold leading-tight">Собрать<br />свой бокс</span>
        </Link>
      </div>

      {/* Subtle footer hint */}
      <p className="mt-8 text-xs text-gray-400">
        Заказ через WhatsApp · +7 777 099 8231
      </p>
    </div>
  );
}
