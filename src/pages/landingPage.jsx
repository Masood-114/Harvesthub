import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import SectionPart from "../components/SectionPart";
import ProductCard from "../components/ProductCard";
import CtButton from "../components/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVeggies } from "../features/veggieSlice";
import CategoryBar from "../components/CategoryBar";
import Heading from "../components/Heading";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status, activeCategory } = useSelector(
    (state) => state.veggies,
  );

  let sliceProducts = items?.slice(0, 8);
  useEffect(() => {
    dispatch(fetchVeggies(activeCategory));
  }, [dispatch]);

  return (
    <div
      className="
      w-full
      max-w-full
      backdrop-blur-lg
      rounded-3xl
      shadow-2xl
    "
    >
      {/* Hero */}
      <SectionPart>
        <section className="relative px-8 py-24 bg-emerald-50/50 overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-6 uppercase tracking-wider">
                Fresh from local farms
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                The smarter way to{" "}
                <span className="text-emerald-600">manage</span> your harvest.
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Connect directly with local growers. Track inventory, manage
                orders, and ensure quality with the HarvestHub management
                system.
              </p>
              <div className="flex sm:flex-row items-center sm:gap-2 gap-4">
                <button
                  onClick={() => navigate("/product")}
                  className="bg-emerald-600 text-white px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all w-full sm:w-auto"
                >
                  Shop Now
                </button>
                <button className="border border-slate-200 bg-white text-slate-900 px-6 py-2 text-sm sm:text-base sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-slate-50 transition-all w-full sm:w-auto">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                  alt="Fresh Vegetables"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden md:block">
                <p className="text-sm font-bold text-slate-900">
                  Today's Delivery
                </p>
                <p className="text-xs text-slate-500 mb-2">
                  124+ Items arriving
                </p>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-400"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-400"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-400"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="pt-20 flex justify-center">
          <Heading firTxt={"Our"} secTxt={"Products"} className="text-6xl" />
        </div>
      </SectionPart>
      {/*Categories Bar */}

      <SectionPart>
        <CategoryBar />
      </SectionPart>

      {/*Card section */}

      <SectionPart>
        {status === "loading" && (
          <p className="text-slate-400 animate-pulse">
            Loading fresh harvest...
          </p>
        )}
        {status === "failed" && (
          <p className="text-slate-400 animate-pulse">
            Failed to load products...
          </p>
        )}
        {status === "success" && (
          <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sliceProducts?.map((item) => (
              <ProductCard key={item.idMeal} item={item} />
            ))}
          </div>
        )}

        <div className=" flex justify-center mt-10">
          <CtButton
            onClick={() => navigate("/product")}
            text="See More"
            className="py-4 px-10"
          />
        </div>
      </SectionPart>
      <div className="flex justify-center mt-20">
        <Heading firTxt={"Our"} secTxt={"Features"} className="text-6xl" />
      </div>
      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Farm-Fresh Quality"
            description="Clean, organic produce harvested at peak freshness."
            emoji="🥬"
          />
          <FeatureCard
            title="Sustainable Practices"
            description="Eco-friendly farming methods that care for the planet."
            emoji="🌍"
          />
          <FeatureCard
            title="Daily Harvests"
            description="Seasonal fruits and vegetables delivered daily."
            emoji="🥕"
          />
        </div>
      </section>
      <SectionPart>
        <TestimonialSection></TestimonialSection>
      </SectionPart>

      {/* Footer */}

      <Footer />
    </div>
  );
}
