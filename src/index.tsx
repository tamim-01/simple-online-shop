import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { UserDetailsContextProvider } from "./store/userDetailContext.tsx";
import ShowingCartsPage from "./components/Pages/ShowingCartsPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/Pages/NotFoundPage.tsx";
import Layout from "./components/Layout.tsx";
import { CartContextProvider } from "./store/cartStore.tsx";
import ProductListPage from "./components/Pages/ShoppingCartPage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <ShowingCartsPage />,
      },
      {
        path: "/shoppingCart",
        element: <ProductListPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CartContextProvider>
    <UserDetailsContextProvider>
      <RouterProvider router={router} />
    </UserDetailsContextProvider>
  </CartContextProvider>
);
