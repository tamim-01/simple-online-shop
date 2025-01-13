import React from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

interface FullProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

interface ProductItemProps {
  product: FullProduct;
  isMobile: boolean;
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  isMobile,
  index,
}) => {
  const totalPrice = parseFloat(product.price) * product.quantity;

  if (isMobile) {
    return (
      <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
          <span>Number:</span>
          <span>{index + 1}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Title:</span>
          <span>
            {" "}
            {product.title.length > 20
              ? `${product.title.substring(0, 20)}...`
              : product.title}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Description:</span>
          <span>
            {" "}
            {product.description.length > 30
              ? `${product.description.substring(0, 30)}...`
              : product.description}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Quantity:</span>
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <FaMinus />
            </button>
            <span>{product.quantity}</span>
            <button className="text-gray-500 hover:text-gray-700">
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Price:</span>
          <span>${product.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="mt-2 text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
    );
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-4 border-b">{index + 1}</td>
      <td className="py-2 px-4 border-b">{product.title}</td>
      <td className="py-2 px-4 border-b">
        {product.description.length > 50
          ? `${product.description.substring(0, 50)}...`
          : product.description}
      </td>
      <td className="py-2 px-4 border-b">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <FaMinus />
          </button>
          <span>{product.quantity}</span>
          <button className="text-gray-500 hover:text-gray-700">
            <FaPlus />
          </button>
        </div>
      </td>
      <td className="py-2 px-4 border-b">${product.price}</td>
      <td className="py-2 px-4 border-b">${totalPrice.toFixed(2)}</td>
      <td className="py-2 px-4 border-b">
        <button className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
