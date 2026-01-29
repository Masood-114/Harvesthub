import { addToCart } from "../features/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";
import MealPopup from "./MealPop";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  let price = Math.floor(100 + Math.random() * 100);

  const handleCart = () => {
    dispatch(
      addToCart({
        idMeal: item.idMeal,
        name: item.strMeal,
        image: item.strMealThumb,
        price: price,
      }),
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.strMealThumb}
          alt={item.strMeal}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-700">
          Organic
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-slate-900 mb-1 truncate">
          {item.strMeal}
        </h3>
        <p className="text-xs text-slate-500 mb-4">Freshly harvested today</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900">${price}</span>
            <span className="text-xs text-slate-400 font-normal">/ kg</span>
          </div>

          <button
            onClick={handleCart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7v14" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <MealPopup idMeal={item.idMeal} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
