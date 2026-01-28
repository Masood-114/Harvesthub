import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-md"
      >
        <h1 className="text-6xl font-bold text-emerald-600 mb-4">🚫</h1>
        <h2 className="text-3xl font-semibold text-slate-900 mb-2">
          Access Denied
        </h2>
        <p className="text-slate-500 mb-6">
          You do not have permission to view this page. Please contact the admin
          if you believe this is an error.
        </p>
        <Link
          to="/"
          className="inline-block bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition"
        >
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;
