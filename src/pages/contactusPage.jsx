import { useForm } from "react-hook-form";
import Navbar from "../components/navbar/NavBar";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact Form Data:", data);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Info Section */}
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
              Get in <span className="text-emerald-600">Touch</span>
            </h1>
            <p className="text-slate-600 mb-8">
              Have questions about fresh produce, bulk orders, or partnerships?
              Fill out the form and our team will reach out shortly.
            </p>

            <div className="space-y-4 text-sm text-slate-600">
              <p>📍 123 Harvest Street, Green Valley</p>
              <p>📞 +91 98765 43210</p>
              <p>📧 support@harvesthub.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl border p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Order Inquiry"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                ></textarea>
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
