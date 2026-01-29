import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/NavBar";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-emerald-50/60 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            About HarvestHub
          </span>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
            Connecting Farmers &{" "}
            <span className="text-emerald-600">Fresh Markets</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            HarvestHub is a farm-to-market platform designed to simplify
            inventory management, ensure freshness, and empower local growers
            with smart technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-600 mb-4">
              Our mission is to reduce food waste, improve transparency, and
              support sustainable agriculture by directly connecting producers
              with buyers.
            </p>
            <p className="text-slate-600">
              We believe technology should empower farmers, not replace them.
              That’s why HarvestHub focuses on simplicity, reliability, and
              trust.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border">
            <img
              src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"
              alt="Farm produce"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-y">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-extrabold text-emerald-600">500+</h3>
            <p className="text-sm text-slate-500">Local Farmers</p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-emerald-600">10K+</h3>
            <p className="text-sm text-slate-500">Orders Delivered</p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-emerald-600">100%</h3>
            <p className="text-sm text-slate-500">Quality Assurance</p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-emerald-600">24/7</h3>
            <p className="text-sm text-slate-500">Support</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Sustainability
              </h4>
              <p className="text-sm text-slate-600">
                Promoting eco-friendly and responsible farming practices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="font-semibold text-slate-900 mb-2">Trust</h4>
              <p className="text-sm text-slate-600">
                Transparent pricing and reliable supply chains.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-semibold text-slate-900 mb-2">Innovation</h4>
              <p className="text-sm text-slate-600">
                Using technology to improve efficiency and quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border text-center">
              <div className="text-4xl mb-4">💚</div>
              <h4 className="font-semibold text-slate-900 mb-2">Community</h4>
              <p className="text-sm text-slate-600">
                Supporting farmers and strengthening local economies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Join the Fresh Food Revolution
        </h2>
        <p className="mb-6 text-emerald-100">
          Be part of a smarter, greener way to manage harvests.
        </p>
        <button
          onClick={() => navigate("/product")}
          className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition"
        >
          Explore Products
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
