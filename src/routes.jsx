import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "./Layouts/MainLayouts";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Categories from "./components/categories/Categories";
import ProductDetails from "./components/products/ProductDetails";
import Products from "./components/products/Products";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      
    ],
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,

  },
  {
      path: "categories",
      element: <Categories />,},
      {
    path: "/products",
    element: <Products />,
  },

  {
  path: "products/:id",
  element: <ProductDetails />,
}
  
  
]);

export default router;