import { Outlet, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { BaseLayout } from "./components/BaseLayout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/catalog" element={<Outlet />}>
          <Route index element={<CatalogPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<p>There is nothing here: 404!</p>} />
      </Route>
    </Routes>
  );
}

export default App;
