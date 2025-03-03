import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { getCart } from "../../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/AuthContext";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid),
  });

  return (
    <div className="relative">
      <FaCartShopping className="text-2xl" />
      {products && (
        <p className="w-4 h-4 text-xs text-center bg-[#FF8780] text-white font-bold rounded-full absolute -top-1 -right-2 ">
          {products.length}
        </p>
      )}
    </div>
  );
}
