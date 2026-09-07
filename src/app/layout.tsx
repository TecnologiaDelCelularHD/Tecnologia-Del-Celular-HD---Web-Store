import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloatingButton } from '@/components/layout/WhatsAppFloatingButton';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name + ' — Celulares, Accesorios y Servicio Técnico',
    template: '%s | ' + siteConfig.name,
  },
  description: 'Venta de celulares nuevos y usados garantizados en Colombia. iPhone, Samsung, Xiaomi, repuestos y servicio técnico con atención directa por WhatsApp.',
  keywords: ['celulares colombia', 'iphone usados', 'samsung galaxy', 'servicio tecnico celulares', 'tecnologia del celular hd', 'adan adellan'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#090d16] text-slate-100 flex flex-col min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}
