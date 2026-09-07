'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { demoProducts } from '@/lib/demo-products';
import { ProductCondition } from '@/types';

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'iPhone', value: 'iPhone' },
  { label: 'Samsung', value: 'Samsung' },
  { label: 'Xiaomi', value: 'Xiaomi' },
  { label: 'Motorola', value: 'Motorola' },
  { label: 'Accesorios', value: 'Accesorios' },
  { label: 'Repuestos', value: 'Repuestos' },
  { label: 'Otros', value: 'Otros' },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [conditionFilter, setConditionFilter] = useState<'all' | ProductCondition>('all');

  const filteredProducts = useMemo(() => {
    return demoProducts.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (conditionFilter !== 'all' && product.condition !== conditionFilter) {
        return false;
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesModel = product.model.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, conditionFilter, searchTerm, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Catálogo de Productos
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explora celulares, repuestos y accesorios con garantía en tienda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Buscar por marca, modelo o nombre (ej. iPhone 13, S23)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 md:col-span-6">
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value as any)}
            className="w-1/2 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="all">Condición: Todas</option>
            <option value="NUEVO">Nuevos</option>
            <option value="USADO">Usados / Seminuevos</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-1/2 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={
                'px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ' +
                (isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700')
              }
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm font-medium">
            No se encontraron productos con esos filtros.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setConditionFilter('all');
            }}
            className="mt-3 text-xs font-bold text-blue-400 hover:underline"
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Cargando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
