import React from "react";

const MenuItemCard = ({ item, onAdd }) => {
  return (
    <div
      onClick={() => onAdd(item)}
      className="cursor-pointer hover:shadow-md transition border rounded-lg p-4"
    >
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.category}</p>
      <p className="text-emerald-600 font-bold">Ksh {item.price}</p>
      {item.inStock ? (
        <p className="text-emerald-600 font-bold">In Stock</p>
      ) : (
        <p className="text-red-600 font-bold">Out of Stock</p>
      )}
    </div>
  );
};

export { MenuItemCard };
