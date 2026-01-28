import LandingPage from "./pages/landingPage";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/productPage";
import CartPage from "./pages/cartPage";
import ContactUs from "./pages/contactusPage";
import AboutPage from "./pages/aboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/loginPage";
import AdminDashboard from "../src/pages/dashboardPages/adminDashboard";
import AuthLayout from "./layouts/authlayout";
import AppLayout from "./layouts/applayout";
import DashboardLayout from "./layouts/dashboardlayout";
import UserPage from "./pages/dashboardPages/adminUserPage";
import ModeratorPage from "./pages/moderatorPage";
import ProtectedRoute from "./routes/protectedRoute";
import UnauthorizedPage from "./pages/unathorizedPage";

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
