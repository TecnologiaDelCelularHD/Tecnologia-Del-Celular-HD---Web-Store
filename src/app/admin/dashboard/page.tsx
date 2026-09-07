'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Users, FileText, ShoppingBag, ShieldCheck, Plus, ArrowUpRight, TrendingUp } from 'lucide-react';
import { formatCOP } from '@/lib/utils';
import { demoProducts } from '@/lib/demo-products';

export default function AdminDashboardPage() {
  const totalProducts = demoProducts.length;
  const availableProducts = demoProducts.filter((p) => p.status === 'AVAILABLE').length;
  const promoProducts = demoProducts.filter((p) => p.hasActivePromotion).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
              Panel Administrativo
            </span>
            <span className="text-xs text-slate-400">Rol: ADMIN (Adan Adellan)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Dashboard del Negocio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/productos"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Gestionar Productos</span>
          </Link>
          <Link
            href="/admin/usuarios"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
          >
            <Users className="w-4 h-4" />
            <span>Usuarios & Roles</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Total Productos</span>
            <Smartphone className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalProducts}</div>
          <div className="text-[11px] text-emerald-400 font-medium">
            {availableProducts} disponibles en tienda
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Cotizaciones</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">4</div>
          <div className="text-[11px] text-slate-400">
            Canal WhatsApp activo
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">En Promoción</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{promoProducts}</div>
          <div className="text-[11px] text-slate-400">
            Equipos con descuento
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Equipo / Roles</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">3</div>
          <div className="text-[11px] text-purple-400 font-medium">
            Adan, Wilmer, Vendedor
          </div>
        </div>
      </div>

      {/* Quick Navigation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Productos Recientes</h3>
            <Link href="/admin/productos" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {demoProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <div>
                  <div className="text-xs font-bold text-white">{product.name}</div>
                  <div className="text-[11px] text-slate-400">{product.brand} • Stock: {product.stock}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-white">{formatCOP(product.price)}</div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Disponible</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Acciones Rápidas</h3>
            <span className="text-xs text-slate-500">V1 Operativa</span>
          </div>
          <div className="space-y-3">
            <Link
              href="/admin/productos"
              className="block p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition text-xs"
            >
              <div className="font-bold text-slate-200">Crear o Editar Producto</div>
              <div className="text-slate-500 mt-0.5">Modificar precios en COP, stock o marcar como agotado.</div>
            </Link>
            <Link
              href="/admin/usuarios"
              className="block p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition text-xs"
            >
              <div className="font-bold text-slate-200">Gestionar Roles y Vendedores</div>
              <div className="text-slate-500 mt-0.5">Permisos para Adan (ADMIN), Wilmer (ADMIN) y Vendedor.</div>
            </Link>
            <Link
              href="/catalogo"
              className="block p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 hover:border-blue-500/60 transition text-xs"
            >
              <div className="font-bold text-blue-300">Ver Catálogo Público en Vivo</div>
              <div className="text-slate-400 mt-0.5">Comprobar cómo ven los clientes la tienda en el celular.</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
