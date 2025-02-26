import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { login } from "../api/firebase";

export default function Navbar() {
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-[#F96162]">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex item-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new" className="text-2xl">
          <BsFillPencilFill />
        </Link>
        <button onClick={() => login()}>Login</button>
      </nav>
    </header>
  );
}
