import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiUser, FiX } from "react-icons/fi";
import { useState } from "react";
import CtButton from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/authSlice";

const DashboardNavbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-white/90 backdrop-blur sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
            <span>AD</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Admin<span className="text-emerald-600">Hub</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link
            to="/dashboard"
            className="hover:text-emerald-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/users"
            className="hover:text-emerald-600 transition-colors"
          >
            Users
          </Link>

          <Link
            to="/dashboard/orders"
            className="hover:text-emerald-600 transition-colors"
          >
            Orders
          </Link>
        </div>

        {/* Right Actions */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-slate-900 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
            >
              <FiUser />
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
        )}
        <div className="flex items-center gap-2">
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
          <div className="flex flex-col px-6 py-4 gap-3 text-sm font-medium text-slate-700">
            <Link to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
            <Link to="/users">Users</Link>
            <Link to="/dashboard/products" onClick={() => setOpen(false)}>
              Products
            </Link>
            <Link to="/dashboard/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
            <CtButton
              className="h-9"
              text="Go to Site"
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
            />
            <button
              onClick={() => navigate("/")}
              className="bg-slate-900 text-white px-4 py-2  rounded-md text-sm font-medium hover:bg-slate-800 transition-all shadow-sm"
            >
              Go to Site
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;
