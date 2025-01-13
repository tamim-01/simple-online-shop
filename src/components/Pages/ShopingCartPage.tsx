import React, { useContext } from "react";
import ProductItem from "../ProductItem.tsx";
import CartContext from "../../store/cartStore.tsx";
import { Link } from "react-router-dom";

interface FullProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

const ProductListPage: React.FC = () => {
  const cartCtx = useContext(CartContext);
  const productIds = cartCtx.addedToCartItems;

  const fullProducts: FullProduct[] | undefined = productIds
    ?.map((item2) => {
      const fullItem = cartCtx.storedItems?.find(
        (item) => item.id === item2.id
      );
      if (!fullItem) return null;

      return {
        ...fullItem,
        quantity: item2.quantity,
      };
    })
    .filter(Boolean) as FullProduct[];

  const totalPrice =
    fullProducts?.reduce(
      (total, product) => total + parseFloat(product.price) * product.quantity,
      0
    ) || 0;

  if (!fullProducts || fullProducts.length === 0) {
    return (
      <div className="container mt-12  mx-auto p-4 max-w-[992px] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to={"/"}>
          <h2 className="text-xl font-medium mb-4 underline hover:text-blue-600">
            back to shop
          </h2>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-[992px]">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      <div className="block md:hidden">
        {fullProducts.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            isMobile={true}
            index={index}
          />
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Number</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fullProducts.map((product, index) => (
              <ProductItem
                key={product.id}
                product={product}
                isMobile={false}
                index={index}
              />
            ))}
          </tbody>
          <tfoot>
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
