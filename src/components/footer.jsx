import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {/* Column 1: Logo & Brand */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-emerald-500">HarvestHub</h2>
            <p className="text-sm text-slate-400">
              Fresh ideas, sustainable growth, smarter living.
            </p>
            <div className="flex gap-3 mt-2">
              <FiFacebook className="w-5 h-5 hover:text-emerald-500 transition" />
              <FiTwitter className="w-5 h-5 hover:text-emerald-500 transition" />
              <FiInstagram className="w-5 h-5 hover:text-emerald-500 transition" />
              <FiGithub className="w-5 h-5 hover:text-emerald-500 transition" />
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-100">Products</h3>
            <Link
              to="/product"
              className="hover:text-emerald-500 transition text-sm"
            >
              All Products
            </Link>
            <Link
              to="/cart"
              className="hover:text-emerald-500 transition text-sm"
            >
              Cart
            </Link>
            <Link
              to="/about"
              className="hover:text-emerald-500 transition text-sm"
            >
              About Us
            </Link>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-100">Company</h3>
            <Link
              to="/about"
              className="hover:text-emerald-500 transition text-sm"
            >
              About
            </Link>
            <Link
              to="/contactus"
              className="hover:text-emerald-500 transition text-sm"
            >
              Contact
            </Link>
            <Link
              to="/signup"
              className="hover:text-emerald-500 transition text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Column 4: Support */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-100">Support</h3>
            <Link
              to="/faq"
              className="hover:text-emerald-500 transition text-sm"
            >
              FAQ
            </Link>
            <Link
              to="/support"
              className="hover:text-emerald-500 transition text-sm"
            >
              Help Center
            </Link>
            <Link
              to="/terms"
              className="hover:text-emerald-500 transition text-sm"
            >
              Terms & Conditions
            </Link>
          </div>

          {/* Column 5: Subscribe */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-100">Subscribe</h3>
            <p className="text-sm text-slate-400">
              Get the latest updates and offers
            </p>
            <form className="flex mt-2 gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-3 py-2 rounded-lg text-slate-900"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} HarvestHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
