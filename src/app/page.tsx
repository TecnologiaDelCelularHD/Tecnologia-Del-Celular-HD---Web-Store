'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Wrench, MessageSquare, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { demoProducts } from '@/lib/demo-products';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  const featuredProducts = demoProducts.filter((p) => p.isFeatured);

  const categories = [
    { name: 'iPhone', count: 'Disponibles 10/10', href: '/catalogo?category=iPhone', icon: '📱' },
    { name: 'Samsung', count: 'Gama Alta y Media', href: '/catalogo?category=Samsung', icon: '⚡' },
    { name: 'Xiaomi', count: 'Potencia & Precio', href: '/catalogo?category=Xiaomi', icon: '🔥' },
    { name: 'Accesorios', count: 'Cargadores & Vidrios', href: '/catalogo?category=Accesorios', icon: '🔌' },
    { name: 'Repuestos', count: 'Pantallas & Baterías', href: '/catalogo?category=Repuestos', icon: '🛠️' },
  ];

  const whatsappQuoteUrl = 'https://wa.me/' + siteConfig.whatsappNumber + '?text=' + encodeURIComponent('Hola, quiero solicitar una cotización con Tecnología del Celular HD.');
  const whatsappRepairUrl = 'https://wa.me/' + siteConfig.whatsappNumber + '?text=' + encodeURIComponent('Hola, quiero información sobre el servicio técnico y cotizar una reparación en Tecnología del Celular HD.');

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 border-b border-slate-800/80 bg-radial-[at_top_right] from-blue-900/20 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                <Zap className="w-4 h-4 text-blue-400 fill-blue-400" />
                <span>Tienda Especializada en Celulares y Soporte</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Tecnología móvil con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">garantía real</span> y atención directa.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Equipos nuevos y usados seleccionados bajo estricto peritaje técnico. Agrega al carrito, cotiza al instante y recibe atención personalizada por WhatsApp con Adan Adellan.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/catalogo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Ver Catálogo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Cotizar por WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Garantía por escrito</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Taller de reparación</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Recogida en tienda</span>
                </div>
              </div>
            </div>

            {/* Visual Feature Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tienda Abierta</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Lunes a Sábado</span>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Equipo Recomendado</div>
                      <div className="text-sm font-bold text-white">iPhone 13 128 GB (10/10)</div>
                    </div>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      $1.850.000
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Servicio Express</div>
                      <div className="text-sm font-bold text-white">Cambio de Batería & Pantalla</div>
                    </div>
                    <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                      En el día
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                    <span>Tu cotización se arma en el carrito y se confirma directo por WhatsApp sin enredos.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Fast Nav */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Explorar por Categoría</span>
          </h2>
          <Link href="/catalogo" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            Ver todas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{cat.name}</div>
                <div className="text-[11px] text-slate-400">{cat.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Equipos Destacados
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Los celulares más cotizados de la semana con entrega inmediata
            </p>
          </div>
          <Link
            href="/catalogo"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200"
          >
            Ver más equipos
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Technical Service Section */}
      <section id="servicio-tecnico" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-slate-800 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Wrench className="w-3.5 h-3.5" /> Servicio Técnico Profesional
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ¿Tu celular falló o se rompió la pantalla?
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              En Tecnología del Celular HD diagnosticamos y reparamos tu dispositivo con repuestos de alta calidad y tiempos récord de entrega.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Cambio de pantallas iPhone / Samsung
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Reemplazo de baterías con 100% de condición
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Pines de carga y problemas de audio
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Mantenimiento preventivo general
              </li>
            </ul>

            <div className="pt-4">
              <a
                href={whatsappRepairUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition"
              >
                <MessageSquare className="w-4 h-4" /> Consultar Servicio Técnico por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
