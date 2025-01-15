import React, { useContext } from "react";
import ProductItem from "../ProductItem.tsx";
import { Link } from "react-router-dom";
import CartContext from "../../store/cartStore.tsx";

const ProductListPage = () => {
  const { cartItems, products } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return total;
    return total + parseFloat(product.price) * (item.quantity || 0);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mt-12 mx-auto p-4 max-w-[992px] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link
          to="/"
          className="text-xl font-medium mb-4 underline hover:text-blue-600"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-[992px]">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Number</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b text-nowrap">Total Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              const product = products.find((p) => p.id === item.id);
              if (!product) return null;

              return <ProductItem key={item.id} product={item} index={index} />;
            })}
          </tbody>
          <tfoot className="hidden md:table-footer-group">
            <tr>
              <td
                colSpan={6}
                className="py-2 px-4 border-t text-right font-bold"
              >
                Total
              </td>
              <td className="py-2 px-4 border-t font-bold">
                ${totalPrice.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="block md:hidden mt-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
