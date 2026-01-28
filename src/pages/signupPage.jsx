import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "user",
      }),
    );
    navigate("/login");
    console.log("Validated Data:", data);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* LEFT IMAGE SECTION */}
        <div className="hidden md:flex relative">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            alt="Nature"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-700/60" />
          <div className="relative z-10 flex flex-col justify-center p-10 text-white">
            <h2 className="text-4xl font-bold  mb-4">
              Grow with HarvestHub 🌿
            </h2>
            <p className="text-lg text-emerald-100">
              Join a community focused on fresh ideas, sustainable growth, and
              smarter living.
            </p>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Create Account
          </h2>
          <p className="text-slate-500 mb-8">Join HarvestHub and start fresh</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1">
              <Label className="text-sm text-slate-600 ">Full Name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-sm  text-red-500 ">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label className="text-sm text-slate-600 ">Email</Label>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm  text-red-500 ">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label className="text-sm text-slate-600 ">Password</Label>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                placeholder="Create password"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/*Confirm Password */}
            <div className="space-y-1">
              <Label className="text-sm text-slate-600 ">
                Confirm Password
              </Label>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                placeholder="Confirm password"
              />
              {errors.confirmpassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-emerald-200"
              >
                Sign Up
              </motion.button>
            </div>
          </form>

          <p className="text-sm text-center text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
