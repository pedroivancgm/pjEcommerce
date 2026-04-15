// src/app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert("Erro no login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          <h1 className="text-2xl font-bold text-white text-center">
            Login
          </h1>

          <input
            className="p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            className="p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className="bg-indigo-600 hover:bg-indigo-500 transition-colors p-3 rounded-lg text-white font-semibold"
          >
            Entrar
          </button>

          <p
            onClick={() => router.push("/register")}
            className="text-sm text-zinc-400 text-center cursor-pointer hover:text-white"
          >
            Criar conta
          </p>

        </form>
      </div>

    </div>
  );
}