import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Edit2 } from 'lucide-react';
import { useContent } from '@/src/contexts/ContentContext';

interface EditableImageSliderProps {
  id: string;
  defaultImages: string[];
}

export function EditableImageSlider({ id, defaultImages }: EditableImageSliderProps) {
  const { isEditing, content, updateContent } = useContent();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  // Get images from content context or use defaults
  const imagesJson = content[id];
  const images: string[] = React.useMemo(() => {
    if (imagesJson) {
      try {
        return JSON.parse(imagesJson);
      } catch (e) {
        console.error('Failed to parse gallery images', e);
      }
    }
    return defaultImages || [];
  }, [imagesJson, defaultImages]);

  const updateGallery = (newImages: string[]) => {
    updateContent(id, JSON.stringify(newImages));
  };

  const handleAddImage = () => {
    const url = window.prompt('Enter new image URL:');
    if (url) {
      const newImages = [...images, url];
      updateGallery(newImages);
      setCurrentIndex(newImages.length - 1);
    }
  };

  const handleRemoveImage = () => {
    if (images.length === 0) return;
    if (window.confirm('Are you sure you want to remove this image from the gallery?')) {
      const newImages = images.filter((_, i) => i !== currentIndex);
      updateGallery(newImages);
      if (currentIndex >= newImages.length && newImages.length > 0) {
        setCurrentIndex(newImages.length - 1);
      }
    }
  };

  const handleEditImage = () => {
    if (images.length === 0) return;
    const url = window.prompt('Edit image URL:', images[currentIndex]);
    if (url && url !== images[currentIndex]) {
      const newImages = [...images];
      newImages[currentIndex] = url;
      updateGallery(newImages);
    }
  };

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
    if (images.length <= 1) return;
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  if (images.length === 0 && !isEditing) return null;

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-surface-container-highest border border-outline-variant mb-12 group">
      {images.length > 0 ? (
        <>
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
              drag={images.length > 1 ? "x" : false}
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
          {images.length > 1 && (
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
          )}

          {/* Indicators */}
          {images.length > 1 && (
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
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface/30">
          <Plus size={48} strokeWidth={1} />
          <span className="text-xs font-bold uppercase tracking-widest mt-4">No gallery images</span>
        </div>
      )}

      {/* Edit Overlay */}
      {isEditing && (
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button
            onClick={handleAddImage}
            className="p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 transition-transform"
            title="Add Image"
          >
            <Plus size={18} />
          </button>
          {images.length > 0 && (
            <>
              <button
                onClick={handleEditImage}
                className="p-2 bg-surface text-on-surface rounded-full shadow-lg hover:scale-110 transition-transform"
                title="Edit Current Image"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={handleRemoveImage}
                className="p-2 bg-error text-on-error rounded-full shadow-lg hover:scale-110 transition-transform"
                title="Remove Current Image"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
