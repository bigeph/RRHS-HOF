import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  if (!images || images.length === 0) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-surface-container-highest border border-outline-variant mb-12 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-grab active:cursor-grabbing"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          className="p-2 bg-surface/80 text-on-surface hover:bg-primary hover:text-on-primary transition-all pointer-events-auto"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-2 bg-surface/80 text-on-surface hover:bg-primary hover:text-on-primary transition-all pointer-events-auto"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-primary w-6' : 'bg-on-surface/30 hover:bg-on-surface/50'
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
