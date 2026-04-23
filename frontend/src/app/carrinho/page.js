"use client";

import { useEffect, useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";

export default function CarrinhoPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/cart/show", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function increase(product_id) {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ product_id })
    });

    fetchCart();
  }

  async function decrease(product_id) {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3000/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ product_id })
    });

    fetchCart();
  }

  function getTotal() {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }

  if (loading) {
    return <p className="p-8">Carregando...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Seu Carrinho</h1>

      {cart.length === 0 ? (
        <div className="text-slate-800">
          Seu carrinho está vazio.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Lista */}
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border p-4 rounded-xl bg-white">
                
                <div>
                  <h2 className="font-semibold text-slate-600">{item.name}</h2>
                  <p className="text-sm text-slate-500">
                    R$ {parseFloat(item.price).toFixed(2)}
                  </p>

                  {/* Quantidade */}
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decrease(item.product_id)}>
                      <Minus size={16} color="red" />
                    </button>

                    <span className="text-black">{item.quantity}</span>

                    <button onClick={() => increase(item.product_id)}>
                      <Plus size={16} color="green" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-slate-500">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => decrease(item.product_id)}
                    className="text-red-500 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="border p-4 rounded-xl h-fit bg-white">
            <h2 className="font-semibold mb-4 text-slate-700">Resumo</h2>

            <div className="flex justify-between text-slate-600">
              <span>Total</span>
              <span className="font-bold">
                R$ {getTotal().toFixed(2)}
              </span>
            </div>

            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500">
              Finalizar Compra
            </button>
          </div>

        </div>
      )}
    </div>
  );
}