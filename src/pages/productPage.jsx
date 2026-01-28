import { useDispatch, useSelector } from "react-redux";
import Heading from "../components/heading";
import Navbar from "../components/navbar/navbar";
import { lazy, Suspense, useEffect, useState } from "react";
import { fetchVeggies } from "../features/veggieSlice";
import ProductsSelecton from "../components/productsSelecton";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategory, setActiveCategory } from "../features/categorySlice";
import { searchApi, setQuery } from "../features/searchSlice";
import debounce from "../lib/debounce";
import SectionPart from "../components/sectionPart";
const ProductCard = lazy(() => import("../components/productCard"));

const ProductPage = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(8);
  const [localQuery, setLoaclQuery] = useState("");
  const { items: searchResults, query } = useSelector((state) => state.search);

  const debounceSearch = debounce((p) => {
    (dispatch(setQuery(p)), dispatch(searchApi(p)));
  }, 500);

  const handleCahnge = (e) => {
    let value = e.target.value;
    setLoaclQuery(value);
    debounceSearch(value);
  };
  const { items: meals, status } = useSelector((state) => state.veggies);

  const { items: categories, activeCategory } = useSelector(
    (state) => state.category,
  );

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, meals.length));
  };

  const isSearching = query.trim().length > 0;
  const products = isSearching ? searchResults : meals.slice(0, visibleCount);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVeggies(activeCategory));
  }, [dispatch, activeCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;
      if (currentScroll >= scrollHeight - 100 && status === "success") {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [meals.length, status, visibleCount]);

  return (
    <div>
      <SectionPart>
        <div className="max-w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mt-14">
          <div>
            <Heading firTxt={"Fresh"} secTxt={"Product"} className="text-4xl" />
            <p className="text-sm text-slate-500">
              Showing all items from the Hub
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              onChange={handleCahnge}
              type="text"
              value={localQuery}
              placeholder="Search"
              className="px-4 py-2 border rounded-md text-sm w-64 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <select
              value={activeCategory}
              onChange={(e) => dispatch(setActiveCategory(e.target.value))}
              className="px-4 py-2 border rounded-md text-sm bg-white outline-none"
            >
              <option value={"All"}>All</option>
              {categories?.map((cat) => (
                <option key={cat.idCategory} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </select>
          </div>
        </div>
      </SectionPart>

      <main className="max-w-7xl mx-auto px-8 py-12 pt-20 flex justify-center">
        {status === "loading" && <ProductsSelecton />}

        {status === "failed" && (
          <p className="text-slate-600 animate-pulse">
            Failed to load products...
          </p>
        )}

        {status === "success" && (
          <Suspense>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {products ? (
                  products.map((item) => (
                    <motion.div
                      key={item.idMeal}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <ProductCard key={item.idMeal} item={item} />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-slate-600 animate-pulse">Not Found ...</p>
                )}
              </AnimatePresence>
            </div>
          </Suspense>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
