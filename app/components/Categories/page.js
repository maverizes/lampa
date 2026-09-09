import React from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: 1, title: "HTL BUSINESS", href: "/catalog/business" },
  { id: 2, title: "HTL ARCHITECTURAL", href: "/catalog/architectural" },
  { id: 3, title: "HTL OUTDOOR", href: "/catalog/outdoor" },
  { id: 4, title: "HTL RETAIL", href: "/catalog/retail" },
  { id: 5, title: "HTL HOME (DIY)", href: "/catalog/home" },
  { id: 6, title: "HTL EMERGENCY", href: "/catalog/emergency" },
  { id: 7, title: "HTL PRODUCTION", href: "/catalog/production" },
  { id: 8, title: "HTL INTERIOR", href: "/catalog/interior" },
];

export default function Categories() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex flex-col items-center justify-center font-sans">
      <div className="max-w-6xl w-full">
        {/* Заголовок и ссылка в каталог */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Категории продукции
          </h2>

          <Link
            href="/catalog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#22c55e] text-xs sm:text-sm font-medium transition-colors group"
          >
            <span>Перейти в каталог</span>
            <span className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              &#8250;
            </span>
          </Link>
        </div>

        {/* Сетка вертикальных карточек */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="bg-[#f5f5f5] hover:bg-[#ebebeb] rounded-xl p-6 h-[380px] sm:h-[420px] flex flex-col justify-between items-center transition-all duration-200 group relative overflow-hidden"
            >
              {/* Вертикальный текст */}
              <div className="flex-1 flex items-start justify-center pt-2">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-800 uppercase [writing-mode:vertical-rl] rotate-180 select-none">
                  {item.title}
                </span>
              </div>

              {/* Зеленая круглая галочка/стрелка снизу */}
              <div className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                &#8250;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
