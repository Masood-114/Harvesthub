import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ContactUs from "./pages/ContactUsPage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/dashboardPages/AdminDashboard";
import AuthLayout from "./layouts/authlayout";
import AppLayout from "./layouts/applayout";
import DashboardLayout from "./layouts/dashboardlayout";
import UserPage from "./pages/dashboardPages/AdminUserPage";
import ModeratorPage from "./pages/ModeratorPage";
import ProtectedRoute from "./routes/protectedRoute";
import UnauthorizedPage from "./pages/UnathorizedPage";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/*Admin route */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/users" element={<UserPage />} />
        </Route>
      </Route>
      {/*Moderator route */}

      <Route element={<ProtectedRoute allowedRoles={["moderator"]} />}>
        <Route path="/moderator" element={<ModeratorPage />} />
      </Route>

      {/* User route */}

      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
}

export default App;
