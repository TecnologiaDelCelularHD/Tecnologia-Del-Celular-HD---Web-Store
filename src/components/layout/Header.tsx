'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageSquare, Search, Menu, X, Smartphone, ShieldCheck, Wrench } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { siteConfig } from '@/config/site';

export function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappGeneralUrl = 'https://wa.me/' + siteConfig.whatsappNumber + '?text=' + encodeURIComponent('Hola, tengo una pregunta sobre sus productos y servicios en Tecnología del Celular HD.');

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 py-1.5 px-4 text-xs font-medium text-center border-b border-slate-800 flex justify-between items-center max-w-7xl mx-auto">
        <span className="hidden sm:inline-block text-slate-300">
          📍 {siteConfig.location} • Horario: {siteConfig.hours}
        </span>
        <span className="mx-auto sm:mx-0 text-emerald-400 font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> Equipos con Garantía y Venta Directa en Tienda
        </span>
        <span className="hidden sm:inline-block text-slate-400">
          Propietario: {siteConfig.owner}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-black text-lg tracking-tight group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400">
                TECNOLOGÍA DEL CELULAR
              </span>
              <span className="text-xs font-black text-emerald-400 tracking-widest -mt-1">
                HD
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Inicio
            </Link>
            <Link href="/catalogo" className="hover:text-blue-400 transition-colors">
              Catálogo
            </Link>
            <Link href="/catalogo?category=iPhone" className="hover:text-blue-400 transition-colors">
              iPhone
            </Link>
            <Link href="/catalogo?category=Samsung" className="hover:text-blue-400 transition-colors">
              Samsung
            </Link>
            <Link href="/catalogo?category=Accesorios" className="hover:text-blue-400 transition-colors">
              Accesorios
            </Link>
            <Link href="/#servicio-tecnico" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-400 font-semibold">
              <Wrench className="w-4 h-4" /> Servicio Técnico
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/catalogo"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Buscar productos"
            >
              <Search className="w-5 h-5" />
            </Link>

            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-600/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/carrito"
              className="relative p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition shadow-md shadow-blue-600/20 flex items-center"
              title="Ver Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-900 animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-blue-400 font-medium border-b border-slate-900"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-blue-400 font-medium border-b border-slate-900"
          >
            Catálogo Completo
          </Link>
          <Link
            href="/catalogo?category=iPhone"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-blue-400 font-medium border-b border-slate-900"
          >
            Celulares iPhone
          </Link>
          <Link
            href="/catalogo?category=Samsung"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-blue-400 font-medium border-b border-slate-900"
          >
            Celulares Samsung
          </Link>
          <Link
            href="/catalogo?category=Xiaomi"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-blue-400 font-medium border-b border-slate-900"
          >
            Celulares Xiaomi
          </Link>
          <Link
            href="/catalogo?category=Accesorios"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-blue-400 font-medium border-b border-slate-900"
          >
            Accesorios y Cargadores
          </Link>
          <Link
            href="/#servicio-tecnico"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Servicio Técnico y Reparaciones
          </Link>
          <a
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm"
          >
            <MessageSquare className="w-4 h-4" /> Hablar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
