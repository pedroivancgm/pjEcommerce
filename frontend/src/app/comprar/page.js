import { PackageSearch } from 'lucide-react';
import Link from 'next/link';
import ProductCard from "../../components/ProductCard";

async function getProducts() {
  const res = await fetch('http://localhost:3000/products', { 
    cache: 'no-store'
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function ComprarPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto p-8">
      
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">
          Explorar Produtos
        </h1>
        <p className="text-slate-500">
          Encontre as melhores ofertas da nossa comunidade educativa.
        </p>
      </header>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <PackageSearch size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">
            Nenhum produto encontrado no momento.
          </p>
          <Link href="/vender" className="mt-4 text-indigo-600 hover:underline">
            Seja o primeiro a anunciar!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}