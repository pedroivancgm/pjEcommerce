import { ShoppingCart, Eye, PackageSearch } from 'lucide-react';
import Link from 'next/link';

// 1. Função para buscar dados do Rails (Server-side fetch)
async function getProducts() {
  const res = await fetch('http://localhost:3000/products', { 
    cache: 'no-store' // Garante que veremos produtos novos assim que cadastrados
  });
  
  if (!res.ok) return []; // Retorna lista vazia se o Rails estiver offline
  return res.json();
}

export default async function ComprarPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">Explorar Produtos</h1>
        <p className="text-slate-500">Encontre as melhores ofertas da nossa comunidade educativa.</p>
      </header>

      {products.length === 0 ? (
        /* Estado Vazio */
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <PackageSearch size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">Nenhum produto encontrado no momento.</p>
          <Link href="/vender" className="mt-4 text-indigo-600 hover:underline">
            Seja o primeiro a anunciar!
          </Link>
        </div>
      ) : (
        /* Grid de Produtos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all">
              {/* Placeholder de Imagem (já que ainda não temos upload) */}
              <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 transition-colors">
                <ShoppingCart size={32} />
              </div>

              <div className="p-4">
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 px-2 py-1 bg-indigo-50 rounded">
                  {product.category || 'Geral'}
                </span>
                <h3 className="mt-2 font-bold text-slate-800 truncate">{product.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mt-1 h-10">
                  {product.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900">
                    R$ {parseFloat(product.price).toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}