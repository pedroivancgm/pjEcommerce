"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4)));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-950">
      
      {/* Topo */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bem vindo(a)!</h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Cadastro
          </button>
        </div>
      </div>

      {/* Produtos */}
      <h2 className="text-xl font-semibold mb-4">
        Produtos em destaque
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-green-600 font-bold">
              R$ {product.price}
            </p>
          </div>
        ))}
      </div>

      {/* Botão */}
      <div className="mt-6">
        <button
          onClick={() => router.push("/comprar")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ver todos os produtos
        </button>
      </div>
    </div>
  );
}