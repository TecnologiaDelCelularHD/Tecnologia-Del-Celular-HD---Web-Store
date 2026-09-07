'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, MessageSquare, ArrowLeft, ShieldCheck, Store, User, Phone, CheckSquare, Square, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatCOP } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [promoConsent, setPromoConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinueWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Intentar persistir en la base de datos (Customer + Quote + Interaction)
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          promoConsent,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
          })),
        }),
      }).catch((err) => {
        console.warn('DB no conectada aún, continuando directo a WhatsApp:', err);
      });
    } catch (e) {
      console.warn('Error registrando cotización', e);
    }

    // 2. Construir mensaje estructurado para WhatsApp
    let message = 'Hola, ' + siteConfig.name + '.\n\n';
    message += 'Quiero cotizar y confirmar estos productos:\n\n';

    items.forEach((item) => {
      message += '📱 ' + item.product.name + '\n';
      message += 'Cantidad: ' + item.quantity + '\n';
      message += 'Precio mostrado: ' + formatCOP(item.product.price) + '\n\n';
    });

    message += '💰 Total estimado: ' + formatCOP(subtotal) + '\n\n';
    message += '🏪 Método de entrega: Recoger en tienda\n';
    
    if (customerName.trim() || customerPhone.trim()) {
      message += '👤 Cliente: ' + (customerName || 'No especificado') + '\n';
      message += '📞 Teléfono: ' + (customerPhone || 'Mismo número de WhatsApp') + '\n';
    }

    if (promoConsent) {
      message += '✅ Acepto recibir promociones y novedades.\n';
    }

    message += '\nQuiero confirmar disponibilidad, precio final y pasar a recoger en tienda.';

    const whatsappUrl = 'https://wa.me/' + siteConfig.whatsappNumber + '?text=' + encodeURIComponent(message);
    
    setIsSubmitting(false);
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <Store className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">Tu carrito está vacío</h1>
          <p className="text-sm text-slate-400">
            Explora nuestro catálogo de celulares y accesorios para armar tu cotización.
          </p>
        </div>
        <div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Ir al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> Seguir explorando
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Carrito de Cotización ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Confirma tus equipos. No realizas pagos en línea; la compra se finaliza con el vendedor por WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Productos</span>
            <button
              onClick={clearCart}
              className="text-xs font-bold text-red-400 hover:text-red-300 transition"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex gap-4 items-center"
              >
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={'/producto/' + product.slug}
                    className="text-sm font-bold text-white hover:text-blue-400 transition truncate block"
                  >
                    {product.name}
                  </Link>
                  <div className="text-xs text-slate-400 mt-0.5">{product.condition} • {product.brand}</div>
                  <div className="text-sm font-black text-white mt-1">
                    {formatCOP(product.price)}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-slate-500 hover:text-red-400 transition p-1"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-slate-700 bg-slate-950 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 text-slate-300 hover:bg-slate-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="p-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <form
            onSubmit={handleContinueWhatsApp}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl"
          >
            <h2 className="text-lg font-black text-white tracking-tight border-b border-slate-800 pb-3">
              Resumen de la Cotización
            </h2>

            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-2.5">
              <Store className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
              <div>
                <div className="font-bold text-blue-300">Entrega: Recoger en tienda</div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Confirmas tu equipo por WhatsApp y pasas a retirarlo y probarlo en nuestro local comercial.
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Tus Datos para la Cotización
              </div>
              
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nombre completo</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Número de WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 310 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPromoConsent(!promoConsent)}
                className="flex items-start gap-2.5 text-left pt-2 text-xs text-slate-400 hover:text-slate-300 transition"
              >
                {promoConsent ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                )}
                <span>
                  Quiero recibir información y promociones de Tecnología de Celulares HD por WhatsApp.
                </span>
              </button>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal estimado</span>
                <span className="font-semibold text-slate-200">{formatCOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Entrega en tienda</span>
                <span className="font-semibold text-emerald-400">Gratis</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Estimado</span>
                <span className="text-lg text-emerald-400">{formatCOP(subtotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Preparando WhatsApp...</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Continuar por WhatsApp</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Atención personalizada por Adan Adellan</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
