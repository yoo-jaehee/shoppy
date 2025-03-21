import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "/src/context/AuthContext";
import CartItem from "../components/CartItem";
import { getCart } from "../api/firebase";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa6";
import PriceCard from "../components/ui/PriceCard";
import Button from "../components/ui/Button";

const SHIPPING = 3000;
export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid),
  });

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );
  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-5 border-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className="flex justify-between mb-6 items-center px-2 md:px-8 lg:px-16">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총 금액" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
}
