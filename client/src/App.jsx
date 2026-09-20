import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <ProtectedRoute>
                  <AdminProductForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <ProtectedRoute>
                  <AdminProductForm />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
