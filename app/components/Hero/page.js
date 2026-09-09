"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Импортируем новое фото для 2-го слайда
import LampaVerh from "../../../public/lampaVerh.png";

const SLIDES = [
  {
    id: "01",
    title: (
      <>
        Дизайнерские <br />
        светильники <br />
        <span className="text-[#22c55e]">OFL DROP</span>
      </>
    ),
    description:
      "Светильник OFL DROP имеет изящную каплевидную форму и также обладает рядом интересных технических особенностей, выгодно отличающих его от конкурентов.",
    // 1-й слайд: предыдущее фото
    image: "/lampa.png",
    link: "#details-1",
  },
  {
    id: "02",
    title: (
      <>
        Интерьерное <br />
        освещение <br />
        <span className="text-[#22c55e]">OFL LINE</span>
      </>
    ),
    description:
      "Минималистичные линейные светильники для создания мягкого и равномерного общего освещения в современных интерьерах.",
    // 2-й слайд: новое фото
    image: LampaVerh,
    link: "#details-2",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const currentIndex = Math.abs(page % SLIDES.length);
  const currentSlide = SLIDES[currentIndex];

  const paginate = (newDirection) => {
    setImageLoaded(false);
    setImageError(false);
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="relative w-full min-h-[500px] bg-white py-16 px-8 md:px-16 flex items-center justify-center font-sans overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
        {/* Номер слайда */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-8 left-0 text-[#22c55e] text-xl font-medium tracking-tight"
          >
            /{currentSlide.id}
          </motion.div>
        </AnimatePresence>

        {/* --- КОНТЕЙНЕР С ФОТО СЛАЙДА --- */}
        <div className="relative w-full aspect-[4/3] md:aspect-square flex items-center justify-center overflow-hidden rounded-xl">
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 font-medium text-sm z-0">
              {imageError ? "Ошибка загрузки фото" : "Загрузка изображения..."}
            </div>
          )}

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000 || offset.x < -100) {
                  paginate(1);
                } else if (swipe > 10000 || offset.x > 100) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
            >
              <Image
                src={currentSlide.image}
                alt="Светильник"
                fill
                priority
                className={`object-contain select-none transition-opacity duration-200 ${
                  imageLoaded && !imageError ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- ТЕКСТОВОЙ БЛОК --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-start space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 uppercase leading-none">
              {currentSlide.title}
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md font-normal">
              {currentSlide.description}
            </p>

            <a
              href={currentSlide.link}
              className="inline-flex items-center space-x-3 text-gray-800 font-medium text-sm hover:text-[#22c55e] transition-colors group"
            >
              <span className="border-b border-transparent group-hover:border-[#22c55e]">
                Подробнее
              </span>
              <span className="w-7 h-7 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-transform">
                &#8250;
              </span>
            </a>
          </motion.div>
        </AnimatePresence>

        {/* --- КНОПКИ --- */}
        <div className="absolute right-0 bottom-0 md:-bottom-8 flex space-x-3 p-4 md:p-0 z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            aria-label="Предыдущий слайд"
            className="w-9 h-9 rounded-full border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-500 flex items-center justify-center text-xl transition-colors bg-white/80 backdrop-blur-sm"
          >
            &#8249;
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            aria-label="Следующий слайд"
            className="w-9 h-9 rounded-full border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-500 flex items-center justify-center text-xl transition-colors bg-white/80 backdrop-blur-sm"
          >
            &#8250;
          </motion.button>
        </div>
      </div>
    </section>
  );
}
