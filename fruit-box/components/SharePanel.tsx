'use client';

import { useState } from 'react';
import { BoxConfig, buildShareUrl, formatWhatsAppMessage, SIZE_CONFIG, getCellIds } from '@/lib/boxConfig';
import { getItemById } from '@/data/items';

const WHATSAPP_NUMBER = '77770998231';

interface Props {
  config: BoxConfig;
}

export default function SharePanel({ config }: Props) {
  const [copied, setCopied] = useState(false);

  const { all } = getCellIds(config.size);
  const totalCells = all.length;
  const filledCount = Object.keys(config.cells).length;
  const remaining = totalCells - filledCount;
  const isComplete = filledCount === totalCells;

  const shareUrl = isComplete ? buildShareUrl(config, window.location.origin) : '';
  const message = isComplete ? formatWhatsAppMessage(config, shareUrl, getItemById) : '';
  const waUrl = isComplete ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : '#';

  const handleCopy = async () => {
    if (!isComplete) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full p-4 border border-black rounded-2xl bg-white">
      {/* Header: progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Бокс {config.size} · {SIZE_CONFIG[config.size].price.toLocaleString('ru-RU')}₸
        </span>
        <span className={`text-xs font-medium ${isComplete ? 'text-black' : 'text-gray-400'}`}>
          {filledCount} / {totalCells}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${isComplete ? 'bg-black' : 'bg-gray-400'}`}
          style={{ width: `${(filledCount / totalCells) * 100}%` }}
        />
      </div>

      {/* Hint when incomplete */}
      {!isComplete && (
        <p className="text-xs text-gray-500 text-center">
          {filledCount === 0
            ? 'Добавь ингредиенты в ячейки бокса'
            : `Ещё ${remaining} ${remaining === 1 ? 'ячейка' : remaining < 5 ? 'ячейки' : 'ячеек'} — и можно заказывать`}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        {isComplete ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <span>💬</span> Открыть WhatsApp
          </a>
        ) : (
          <button
            disabled
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-400 rounded-xl py-3 text-sm font-medium cursor-not-allowed"
          >
            <span>💬</span> Открыть WhatsApp
          </button>
        )}

        <button
          onClick={handleCopy}
          disabled={!isComplete}
          className={[
            'flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
            isComplete
              ? 'border border-black hover:bg-gray-50 cursor-pointer'
              : 'border border-gray-200 text-gray-300 cursor-not-allowed',
          ].join(' ')}
        >
          {copied ? '✓' : '🔗'}
        </button>
      </div>

      {copied && (
        <p className="text-xs text-center text-gray-500">Ссылка скопирована!</p>
      )}
    </div>
  );
}
