"use client";

import { ShoppingCart, Eye } from "lucide-react";

export default function ProductCard({ product }) {

  async function handleAddToCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado");
      return;
    }

    try {
      await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: product.id
        })
      });

      window.dispatchEvent(new Event("cartChange"));
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
    }
  }

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all">
      
      {/* Imagem / Placeholder */}
      <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 transition-colors">
        <ShoppingCart size={32} />
      </div>

      <div className="p-4">
        {/* Categoria */}
        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 px-2 py-1 bg-indigo-50 rounded">
          {product.category || "Geral"}
        </span>

        {/* Nome */}
        <h3 className="mt-2 font-bold text-slate-800 truncate">
          {product.name}
        </h3>

        {/* Descrição */}
        <p className="text-slate-500 text-sm line-clamp-2 mt-1 h-10">
          {product.description}
        </p>

        {/* Preço + ações */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-black text-slate-900">
            R$ {parseFloat(product.price).toFixed(2)}
          </span>

          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Eye size={20} />
            </button>

            <button
              onClick={handleAddToCart}
              className="p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}