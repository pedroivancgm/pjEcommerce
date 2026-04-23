// src/components/Navbar.js
"use client";

import Link from 'next/link';
import { 
  ShoppingBag, 
  PlusCircle, 
  ShoppingCart 
} from 'lucide-react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);

    const syncAuth = () => {
      const token = localStorage.getItem("token");
      setIsLogged(!!token);
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLogged(false);
    router.push("/login");
  }

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
          Ecommerce<span className="text-slate-800">.DaSilva</span>
        </Link>

        {/* Links Centrais */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/comprar" className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-all">
            <ShoppingBag size={18} />
            <span className="font-medium">Comprar</span>
          </Link>

          <Link href="/vender" className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-all">
            <PlusCircle size={18} />
            <span className="font-medium">Vender</span>
          </Link>
        </div>

        {/* Direita: Carrinho + Auth */}
        <div className="flex items-center gap-4">
          
          {/* Carrinho */}
          <Link href="/carrinho" className="relative p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-colors">
            <ShoppingCart size={24} />
          </Link>

          {/* Auth */}
          {!isLogged ? (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-2">
              
              {/* Indicador */}
              <span className="text-green-500 text-sm font-medium">
                ● Logado
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-400 rounded-lg"
              >
                Sair
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;