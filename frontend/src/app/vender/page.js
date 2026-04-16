"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Package, DollarSign, List, FileText, CheckCircle2 } from 'lucide-react';

export default function VenderPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // 🔐 Proteção de rota
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      router.push("/login");
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ product: formData })
      });

      if (!response.ok) {
        throw new Error("Erro ao criar produto");
      }

      setStatus('success');

      // opcional: limpar form
      setFormData({
        name: '',
        price: '',
        category: '',
        description: ''
      });

    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 scale-90">

      <div className="w-full max-w-2xl bg-zinc-800 p-8 rounded-2xl shadow-lg">
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Vender novo produto
          </h1>
          <p className="text-zinc-400">
            Preencha os detalhes para anunciar seu item
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nome */}
          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-300 mb-2">
              <Package size={16} /> Nome do Produto
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Preço */}
            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-300 mb-2">
                <DollarSign size={16} /> Preço
              </label>
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-300 mb-2">
                <List size={16} /> Categoria
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                <option value="eletronicos">Eletrônicos</option>
                <option value="moveis">Móveis</option>
                <option value="vestuario">Vestuário</option>
              </select>
            </div>

          </div>

          {/* Descrição */}
          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-300 mb-2">
              <FileText size={16} /> Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-3 rounded-lg font-bold text-white transition ${
              status === 'loading'
                ? 'bg-zinc-500'
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {status === 'loading' ? 'Publicando...' : 'Publicar Anúncio'}
          </button>

          {/* Feedback */}
          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-400 bg-green-900/30 p-4 rounded-lg">
              <CheckCircle2 size={20} />
              Produto publicado com sucesso!
            </div>
          )}

          {status === 'error' && (
            <div className="text-red-400 text-sm">
              Erro ao publicar produto
            </div>
          )}

        </form>
      </div>
    </div>
  );
}