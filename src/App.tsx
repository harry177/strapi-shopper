import { Navigate, Outlet, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { BaseLayout } from "./components/BaseLayout";
import "./App.css";

interface IProtectedRoute {
  user: string;
  redirectPath: string;
}

function App() {
  const [cookies] = useCookies(["accessToken"]);

  const ProtectedRoute = ({ user, redirectPath }: IProtectedRoute) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          element={
            <ProtectedRoute user={cookies.accessToken} redirectPath="/" />
          }
        >
          <Route path="/cart" element={<CartPage />} />
        </Route>
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
