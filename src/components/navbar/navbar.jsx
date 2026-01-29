import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../../pages/CartPage";
import { FiMenu, FiUser, FiX } from "react-icons/fi";

import { useState } from "react";
import CtButton from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
    setProfileOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              H
            </div>
          </Link>
          <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
            Harvest<span className="text-emerald-600">Hub</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <Link
            to="/product"
            className="hover:text-emerald-600 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/contactus"
            className="hover:text-emerald-600 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="hover:text-emerald-600 transition-colors"
          >
            About
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <div className="relative">
            <CartDrawer />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile / Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-slate-900 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
              >
                <FiUser />{" "}
                <span className="truncate max-w-[80px] md:max-w-[120px]">
                  {user.name}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50 text-xs md:text-sm">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-emerald-50"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-emerald-50"
                    onClick={() => setProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-slate-900 text-white px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-medium hover:bg-slate-800 transition"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-slate-800"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="flex  flex-col px-4 py-4 gap-3 text-sm font-medium text-slate-700">
            <div className=" flex gap-5 justify-center ">
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/product" onClick={() => setOpen(false)}>
                Products
              </Link>
              <Link to="/contactus" onClick={() => setOpen(false)}>
                Contact Us
              </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </div>
            <CtButton
              className="h-10"
              onClick={() => {
                setOpen(false);
                navigate("/signup");
              }}
              text="Get Started"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
