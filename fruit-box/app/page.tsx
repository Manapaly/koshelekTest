import Link from 'next/link';
import { PRESETS } from '@/data/presets';
import { encodeConfig } from '@/lib/boxConfig';
import { getItemById } from '@/data/items';

export default function Home() {
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center gap-6 px-6 overflow-hidden">
      {/* Logo */}
      <span className="text-xl font-bold tracking-tight">🍓 FruitBox</span>

      {/* 2×2 grid of fixed-size squares */}
      <div className="grid grid-cols-2 gap-3" style={{ width: 'min(340px, 90vw)' }}>
        {PRESETS.slice(0, 3).map((preset) => {
          const encoded = encodeConfig(preset.config);
          const uniqueItems = [...new Set(Object.values(preset.config.cells))]
            .map(getItemById)
            .filter(Boolean)
            .slice(0, 4);

          return (
            <Link
              key={preset.id}
              href={`/constructor?config=${encoded}`}
              style={{ width: 'min(160px, 43vw)', height: 'min(160px, 43vw)' }}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white hover:border-black transition-all p-4 text-center"
            >
              <div className="grid grid-cols-2 gap-1">
                {uniqueItems.map((item) => item && (
                  <span key={item.id} className="text-xl leading-none">{item.emoji}</span>
                ))}
              </div>
              <span className="text-xs font-semibold">{preset.name}</span>
            </Link>
          );
        })}

        {/* Build your own */}
        <Link
          href="/constructor"
          style={{ width: 'min(160px, 43vw)', height: 'min(160px, 43vw)' }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-black bg-black text-white hover:bg-gray-800 transition-all p-4 text-center"
        >
          <span className="text-2xl">✦</span>
          <span className="text-xs font-semibold leading-tight">Собрать<br />свой бокс</span>
        </Link>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400">+7 777 099 8231</p>
    </div>
  );
}
