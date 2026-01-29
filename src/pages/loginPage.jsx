import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import SuccessToast from "../components/SuccessToast";
import { useState } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const [toastShow, setToastShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password,
    );
    if (!user) {
      setToastShow(!toastShow);
      return;
    }

    const token = "fake-jwt-token-" + user.id;

    dispatch(loginSuccess({ user, token }));

    if (user.role === "admin") {
      navigate("/dashboard");
    } else if (user.role === "moderator") {
      navigate("/moderator");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <SuccessToast
        show={toastShow}
        message={"Invalid email or password"}
        className={"bg-red-600"}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full 
          max-w-5xl 
          bg-white 
          rounded-2xl 
          shadow-2xl 
          overflow-hidden 
          grid 
          grid-cols-1 
          lg:grid-cols-2
        "
      >
        {/* LEFT IMAGE SECTION */}
        <div className="hidden lg:flex relative">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-700/60 flex flex-col justify-center p-10 text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome Back 🌱</h2>
            <p className="text-lg opacity-90">
              Manage your products, users, and orders from one powerful
              dashboard.
            </p>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Log In</h2>
            <p className="text-slate-500 mt-2">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Email
              </label>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="example@gmail.com"
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  rounded-lg 
                  focus:ring-2 
                  focus:ring-emerald-500 
                  outline-none
                "
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Password
              </label>
              <Input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="••••••••"
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  rounded-lg 
                  focus:ring-2 
                  focus:ring-emerald-500 
                  outline-none
                "
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="
                w-full 
                bg-emerald-600 
                hover:bg-emerald-700 
                text-white 
                py-3 
                rounded-lg 
                font-semibold 
                shadow-lg 
                shadow-emerald-200
              "
            >
              Login
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-slate-500 mt-8">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
