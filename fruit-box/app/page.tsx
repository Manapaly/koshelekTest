import Link from 'next/link';
import Image from 'next/image';
import { PRESETS } from '@/data/presets';
import { encodeConfig } from '@/lib/boxConfig';

// Maps preset id → photo filename in /public
const PRESET_PHOTOS: Record<string, string> = {
  classic:     '/B9C7361E-CAA2-43D2-BA97-E0514320E8AA.png',
  exotic:      '/AF8B7C9A-9D76-4BEB-B53C-981F10F262EC.png',
  berries:     '/DDCDC843-7052-413E-B6A1-81EA1F4A65CD.png',
};

export default function Home() {
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center gap-6 px-6 overflow-hidden">
      {/* Logo */}
      <span className="text-xl font-bold tracking-tight">🍓 FruitBox</span>

      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-3" style={{ width: 'min(340px, 90vw)' }}>
        {PRESETS.slice(0, 3).map((preset) => {
          const encoded = encodeConfig(preset.config);
          const photo = PRESET_PHOTOS[preset.id];

          return (
            <Link
              key={preset.id}
              href={`/constructor?config=${encoded}`}
              style={{ width: 'min(160px, 43vw)', height: 'min(160px, 43vw)' }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-black transition-all"
            >
              {/* Photo */}
              <Image
                src={photo}
                alt={preset.name}
                fill
                className="object-cover"
                sizes="160px"
              />
              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-2 py-1.5 text-center">
                <span className="text-xs font-semibold">{preset.name}</span>
              </div>
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
