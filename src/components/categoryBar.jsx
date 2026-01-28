import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, setActiveCategory } from "../features/categorySlice"; // Ensure setActiveCategory is imported
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchVeggies } from "../features/veggieSlice";

const CategoryBar = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const dispatch = useDispatch();
  const { items, activeCategory } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const categories = ["All", ...items.map((cat) => cat.strCategory)];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      // Hide right arrow if we are at the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Scrolling by the full width of the visible container "flips" the view
      const scrollAmount =
        direction === "left" ? -container.clientWidth : container.clientWidth;

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-16 mt-10 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-2 relative group">
        {/* Left Arrow */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-50 p-2 bg-white shadow-xl rounded-full text-emerald-600 border border-slate-100"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Categories Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center overflow-x-auto py-4 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }} // Optional: makes it snap to items
        >
          {categories?.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <div
                key={cat}
                className="flex-none w-1/3 sm:w-1/4 md:w-1/6 px-1 transition-all"
                style={{ scrollSnapAlign: "start" }}
              >
                <button
                  onClick={() => {
                    dispatch(setActiveCategory(cat));
                    dispatch(fetchVeggies(cat));
                  }}
                  className={`relative w-full py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300
                    ${isActive ? "text-white" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-emerald-600 shadow-lg shadow-emerald-200"
                      style={{ borderRadius: 12 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-50 p-2 bg-white shadow-xl rounded-full text-emerald-600 border border-slate-100"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default CategoryBar;
