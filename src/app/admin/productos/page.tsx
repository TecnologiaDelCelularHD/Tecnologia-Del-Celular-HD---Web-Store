'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Edit2, Trash2, Eye, EyeOff, Check, Smartphone } from 'lucide-react';
import { demoProducts } from '@/lib/demo-products';
import { Product } from '@/types';
import { formatCOP } from '@/lib/utils';

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [showModal, setShowModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('Apple');
  const [newCategory, setNewCategory] = useState<'Celulares' | 'iPhone' | 'Samsung' | 'Xiaomi' | 'Motorola' | 'Accesorios' | 'Repuestos' | 'Otros'>('iPhone');
  const [newPrice, setNewPrice] = useState('1850000');
  const [newStock, setNewStock] = useState('5');
  const [newCondition, setNewCondition] = useState<'NUEVO' | 'USADO' | 'REACONDICIONADO'>('USADO');

  const handleToggleStatus = (id: string) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === 'AVAILABLE' ? 'OUT_OF_STOCK' : 'AVAILABLE';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProd: Product = {
      id: 'prod-' + Date.now(),
      name: newName,
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: 'Producto ingresado desde el panel administrativo de Tecnología del Celular HD.',
      category: newCategory,
      brand: newBrand,
      model: newName,
      price: Number(newPrice) || 0,
      stock: Number(newStock) || 0,
      status: 'AVAILABLE',
      condition: newCondition,
      warranty: 'Garantía directa en tienda',
      features: ['Equipo verificado', 'Entrega inmediata en local'],
      images: ['https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80'],
      isFeatured: false,
      hasActivePromotion: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts([newProd, ...products]);
    setShowModal(false);
    setNewName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-3">
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Gestión de Productos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Crea, edita precios, modifica stock y oculta equipos de la vitrina
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Nuevo Producto</span>
        </button>
      </div>

      {/* Modal de Creación */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Nuevo Producto</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  placeholder="ej. iPhone 14 128 GB Azul"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Marca</label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  >
                    <option value="iPhone">iPhone</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Motorola">Motorola</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Repuestos">Repuestos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Precio (COP)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Condición</label>
                  <select
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  >
                    <option value="NUEVO">NUEVO</option>
                    <option value="USADO">USADO</option>
                    <option value="REACONDICIONADO">REACONDICIONADO</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de Productos */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio (COP)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{product.name}</div>
                        <div className="text-[11px] text-slate-400">{product.brand} • {product.condition}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{product.category}</td>
                  <td className="p-4 font-bold text-white">{formatCOP(product.price)}</td>
                  <td className="p-4">
                    <span className={'px-2 py-0.5 rounded font-bold ' + (product.stock > 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10')}>
                      {product.stock} unid.
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={'px-2 py-0.5 rounded text-[10px] font-black uppercase ' + (product.status === 'AVAILABLE' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 bg-slate-800')}>
                      {product.status === 'AVAILABLE' ? 'Disponible' : 'Agotado'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(product.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Cambiar estado"
                      >
                        {product.status === 'AVAILABLE' ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
