'use client';

import { useState } from 'react';
import { BoxConfig, buildShareUrl, formatWhatsAppMessage, SIZE_CONFIG } from '@/lib/boxConfig';
import { getItemById } from '@/data/items';

const WHATSAPP_NUMBER = '87770998231';

interface Props {
  config: BoxConfig;
}

export default function SharePanel({ config }: Props) {
  const [copied, setCopied] = useState(false);

  const filledCount = Object.keys(config.cells).length;
  if (filledCount === 0) return null;

  const shareUrl = buildShareUrl(config, window.location.origin);
  const message = formatWhatsAppMessage(config, shareUrl, getItemById);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
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
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Бокс {config.size} · {SIZE_CONFIG[config.size].price.toLocaleString('ru-RU')}₸
        </span>
        <span className="text-xs text-gray-400">{filledCount} позиций</span>
      </div>

      <div className="flex gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <span>💬</span> Открыть WhatsApp
        </a>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 border border-black rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
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
