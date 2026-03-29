import Link from 'next/link';
import { Preset } from '@/data/presets';
import { encodeConfig, SIZE_CONFIG } from '@/lib/boxConfig';
import { getItemById } from '@/data/items';

interface Props {
  preset: Preset;
}

export default function PresetCard({ preset }: Props) {
  const encoded = encodeConfig(preset.config);
  const href = `/constructor?config=${encoded}`;
  const sizeInfo = SIZE_CONFIG[preset.config.size];

  // Get unique items in this preset
  const uniqueItems = [...new Set(Object.values(preset.config.cells))]
    .map(getItemById)
    .filter(Boolean)
    .slice(0, 6);

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 p-5 border border-gray-200 rounded-2xl bg-white hover:border-black transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{preset.emoji}</span>
          <span className="font-semibold text-black">{preset.name}</span>
        </div>
        <span className="text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-2 py-0.5">
          {preset.config.size}
        </span>
      </div>

      {/* Items preview */}
      <div className="flex flex-wrap gap-2">
        {uniqueItems.map((item) => item && (
          <span
            key={item.id}
            className="flex items-center gap-1 text-xs bg-gray-50 border border-gray-100 rounded-full px-2 py-1"
          >
            <span>{item.emoji}</span>
            <span className="text-gray-600">{item.name}</span>
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <span className="text-sm text-gray-500">{preset.description.split(' ')[0]}...</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">
            {sizeInfo.price.toLocaleString('ru-RU')}₸
          </span>
          <span className="text-xs text-black group-hover:underline">
            Собрать →
          </span>
        </div>
      </div>
    </Link>
  );
}
