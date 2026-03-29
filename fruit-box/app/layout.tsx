import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FruitBox — Собери свой фруктовый бокс",
  description: "Конструктор фруктовых боксов. Выбери фрукты, топпинги и размер. Заказ через WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}
