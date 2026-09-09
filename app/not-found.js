"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NotFound() {
  const canvasRef = useRef(null);
  const [show404, setShow404] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const size = 16;
    const cols = Math.ceil(width / size);
    const rows = Math.ceil(height / size);

    // Генерируем массив пикселей
    const pixels = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        pixels.push({
          x: x * size,
          y: y * size,
          speed: 0,
          delay: Math.random() * 25, // Случайная задержка старта падения
          color: Math.random() > 0.3 ? "#22c55e" : "#15803d",
        });
      }
    }

    let animationFrame;

    const render = () => {
      // Заливаем фон тёмно-зелёным оттенком
      ctx.fillStyle = "#050b07";
      ctx.fillRect(0, 0, width, height);

      let activePixels = 0;

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        if (p.delay > 0) {
          p.delay -= 1;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, size - 1, size - 1);
          activePixels++;
        } else if (p.y < height) {
          p.speed += 1.1; // Ускорение (гравитация)
          p.y += p.speed;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, size - 1, size - 1);
          activePixels++;
        }
      }

      // ЖДЕМ, пока абсолютно ВСЕ пиксели упадут за экран (activePixels === 0)
      if (activePixels === 0) {
        // Небольшая пауза после распада для драматического эффекта
        setTimeout(() => {
          setShow404(true);
        }, 150);
      } else {
        animationFrame = requestAnimationFrame(render);
      }
    };

    render();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050b07] text-[#22c55e] p-4 font-mono overflow-hidden select-none">
      {/* Canvas, на котором происходит падение */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${
          show404 ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Появляющийся контент 404 (Показывается СТРОГО после завершения падения) */}
      <div
        className={`relative z-10 flex flex-col items-center text-center transition-all duration-500 transform ${
          show404
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-50 translate-y-10 pointer-events-none"
        }`}
      >
        <h1
          className="text-[25vw] md:text-[14rem] font-black text-[#22c55e] leading-none tracking-widest animate-pulse"
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            textShadow: "8px 8px 0px #093818, -3px -3px 0px #000",
          }}
        >
          404
        </h1>

        <div className="p-5 bg-black border-4 border-[#22c55e] my-6 shadow-[8px_8px_0px_0px_#15803d] max-w-md text-left space-y-2">
          <div className="flex items-center justify-between border-b border-[#22c55e]/30 pb-2">
            <span className="text-xs font-bold text-[#86efac] uppercase tracking-widest">
              [ SYSTEM_COLLAPSED ]
            </span>
            <span className="w-2.5 h-2.5 bg-[#22c55e] animate-ping" />
          </div>
          <p className="text-sm font-bold text-[#86efac] tracking-wide">
            &gt; СТРУКТУРА ПОЛНОСТЬЮ РАССЫПАЛАСЬ.
          </p>
          <p className="text-xs text-gray-400">
            Все элементы интерфеса обрушились. Код страницы не найден.
          </p>
        </div>

        <Link
          href="/"
          className="px-8 py-4 bg-[#22c55e] text-black font-extrabold text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_#093818] hover:shadow-[2px_2px_0px_0px_#093818] hover:bg-[#86efac] active:translate-x-1 active:translate-y-1 transition-all"
          style={{ fontFamily: '"Courier New", Courier, monospace' }}
        >
          [ REBUILD / НА ГЛАВНУЮ ]
        </Link>
      </div>

      {/* Фоновая ретро-сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e0a_2px,transparent_2px),linear-gradient(to_bottom,#22c55e0a_2px,transparent_2px)] bg-[size:2rem_2rem] pointer-events-none" />
    </div>
  );
}
