import React, { useContext } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import CartContext, { Product } from "../store/cartStore.tsx";
interface ProductItemProps {
  product: Product;
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, index }) => {
  const cartCtx = useContext(CartContext);
  const totalPrice = parseFloat(product.price) * product.quantity;

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-4 border-b">{index + 1}</td>
      <td className="py-2 px-4 border-b ">
        {product.title.length > 25
          ? `${product.title.substring(0, 25)}...`
          : product.description}
      </td>
      <td className="py-2 px-4 border-b text-[12px] md:text-sm">
        {product.description.length > 50
          ? `${product.description.substring(0, 50)}...`
          : product.description}
      </td>
      <td className="py-2 px-4 border-b">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => cartCtx.decreaseQuantity(product.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaMinus />
          </button>
          <span>{product.quantity}</span>
          <button
            onClick={() => cartCtx.addToCart(product.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaPlus />
          </button>
        </div>
      </td>
      <td className="py-2 px-4 border-b">${product.price}</td>
      <td className="py-2 px-4 border-b">${totalPrice.toFixed(2)}</td>
      <td className="py-2 px-4 border-b">
        <button
          onClick={() => cartCtx.removeFromCart(product.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
