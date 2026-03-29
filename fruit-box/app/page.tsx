import Link from 'next/link';
import { PRESETS } from '@/data/presets';
import PresetCard from '@/components/PresetCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight">🍓 FruitBox</span>
        <Link
          href="/constructor"
          className="text-sm font-medium border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          Собрать бокс
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4">
        {/* Hero */}
        <section className="py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-4">
            Собери свой<br />фруктовый бокс
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            Выбери фрукты, топпинги и размер. Мы доставим именно такой бокс, какой ты хочешь.
          </p>
          <Link
            href="/constructor"
            className="inline-flex items-center gap-2 bg-black text-white rounded-2xl px-8 py-4 text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Собрать свой бокс →
          </Link>
        </section>

        {/* Preset boxes */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Готовые боксы</h2>
            <span className="text-sm text-gray-400">Нажми чтобы настроить</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRESETS.map((preset) => (
              <PresetCard key={preset.id} preset={preset} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="pb-16 border-t border-gray-100 pt-12">
          <h2 className="text-xl font-bold mb-8 text-center">Как это работает</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { step: '01', emoji: '🎨', title: 'Собери бокс', desc: 'Выбери размер, фрукты и топпинги в конструкторе' },
              { step: '02', emoji: '🔗', title: 'Получи ссылку', desc: 'Нажми «Открыть WhatsApp» или скопируй ссылку' },
              { step: '03', emoji: '📦', title: 'Получи заказ', desc: 'Мы соберём твой бокс и доставим в удобное время' },
            ].map(({ step, emoji, title, desc }) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <span className="text-4xl">{emoji}</span>
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-1">{step}</div>
                  <div className="font-semibold">{title}</div>
                  <div className="text-sm text-gray-500 mt-1">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prices */}
        <section className="pb-16 border-t border-gray-100 pt-12">
          <h2 className="text-xl font-bold mb-6 text-center">Размеры и цены</h2>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {([
              { size: 'S', label: 'Маленький', rows: 2, price: 6000 },
              { size: 'M', label: 'Средний',   rows: 4, price: 9000 },
              { size: 'L', label: 'Большой',   rows: 6, price: 12000 },
            ] as const).map(({ size, label, rows, price }) => (
              <div key={size} className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-2xl text-center">
                <span className="text-2xl font-bold">{size}</span>
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs text-gray-400">{rows * 3} позиций</span>
                <span className="text-sm font-semibold mt-1">
                  {price.toLocaleString('ru-RU')}₸
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 text-center">
          <Link
            href="/constructor"
            className="inline-flex items-center gap-2 bg-black text-white rounded-2xl px-8 py-4 text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Начать собирать →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-6 text-center text-xs text-gray-400">
        <p>FruitBox · Заказ через WhatsApp: +7 777 099 8231</p>
      </footer>
    </div>
  );
}
