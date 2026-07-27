import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import QualityPage from "./pages/Quality/QualityPage";
import DistributionPage from "./pages/Distribution/DistributionPage";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetailsPage from "./pages/Products/ProductDetailsPage";

function ScrollManager() {
  const {
    pathname,
    hash,
    search,
  } = useLocation();

  useEffect(() => {
    if (hash) {
      const sectionId = hash.slice(1);

      const timer = window.setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 120);

      return () =>
        window.clearTimeout(timer);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return undefined;
  }, [pathname, hash, search]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollManager />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/products/:slug"
          element={<ProductDetailsPage />}
        />

        <Route
          path="/quality"
          element={<QualityPage />}
        />

        <Route
          path="/distribution"
          element={<DistributionPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;