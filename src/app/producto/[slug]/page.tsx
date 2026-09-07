'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingBag, MessageSquare, ShieldCheck, Check, ArrowLeft, Clock, Store } from 'lucide-react';
import { demoProducts } from '@/lib/demo-products';
import { formatCOP } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { siteConfig } from '@/config/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const product = demoProducts.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock <= 0 || product.status === 'OUT_OF_STOCK';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappMessage = `Hola, quiero información sobre el ${product.name} que vi en la página de Tecnología del Celular HD.`;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Catálogo
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs shadow-md">
                -{product.discountPercentage}% DESCUENTO
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === idx ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Vista ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-blue-400 uppercase tracking-wider">{product.brand}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{product.category}</span>
              <span className="text-slate-600">•</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                {product.condition}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-white">
                {formatCOP(product.price)}
              </span>
              {product.previousPrice && (
                <span className="text-base text-slate-500 line-through">
                  {formatCOP(product.previousPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              {isOutOfStock ? (
                <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold">
                  Agotado temporalmente
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Disponible para entrega inmediata ({product.stock} en tienda)
                </span>
              )}
            </div>
          </div>

          <div className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Descripción del Equipo
            </h3>
            <p>{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Características Destacadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-200 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            {product.warranty && (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" /> Garantía: {product.warranty}
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-300">
              <Store className="w-4 h-4 text-blue-400 shrink-0" /> Método: {siteConfig.pickupPolicy}
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" /> Horario: {siteConfig.hours}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> ¡Agregado al Carrito!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Agregar al Carrito
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 active:scale-95 transition"
            >
              <MessageSquare className="w-4 h-4" /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
