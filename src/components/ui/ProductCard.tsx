'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, MessageSquare, Check, Shield } from 'lucide-react';
import { Product } from '@/types';
import { formatCOP } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { siteConfig } from '@/config/site';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = React.useState(false);

  const isOutOfStock = product.stock <= 0 || product.status === 'OUT_OF_STOCK';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappMessage = 'Hola, quiero información sobre el ' + product.name + ' que vi en la página de Tecnología del Celular HD.';
  const whatsappUrl = 'https://wa.me/' + siteConfig.whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);

  return (
    <div className="group relative bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-3.5 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5">
        {product.condition && (
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-slate-950/80 backdrop-blur-md text-blue-400 border border-blue-500/30">
            {product.condition}
          </span>
        )}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="px-2 py-0.5 text-[10px] font-black tracking-wider rounded-md bg-emerald-500 text-slate-950 shadow-sm">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      <Link href={'/producto/' + product.slug} className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-950 mb-3 block group-hover:opacity-95 transition-opacity">
        <Image
          src={product.images[0] || 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider">
              Agotado
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1">
        <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>{product.brand}</span>
          <span className="text-slate-500">{product.category}</span>
        </div>

        <Link href={'/producto/' + product.slug} className="text-sm font-bold text-slate-100 hover:text-blue-400 transition-colors line-clamp-2 mb-2">
          {product.name}
        </Link>

        <div className="mt-auto pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-white">
              {formatCOP(product.price)}
            </span>
            {product.previousPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatCOP(product.previousPrice)}
              </span>
            )}
          </div>
          {product.warranty && (
            <div className="text-[10px] text-emerald-400/90 flex items-center gap-1 mt-0.5">
              <Shield className="w-3 h-3" /> {product.warranty}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3.5 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={
              'flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ' +
              (isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20')
            }
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Agregado
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Carrito
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500 text-xs font-bold transition-all shadow-sm"
            title="Consultar por WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
            <span>Consultar</span>
          </a>
        </div>
      </div>
    </div>
  );
}
