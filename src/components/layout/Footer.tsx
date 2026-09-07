import React from 'react';
import Link from 'next/link';
import { Smartphone, MapPin, Clock, Phone, ShieldCheck, Wrench } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-[#050810] border-t border-slate-800/80 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5 font-black text-lg">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold tracking-wider text-slate-100">
                TECNOLOGÍA HD
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Venta de celulares nuevos, usados garantizados, accesorios premium, repuestos y servicio técnico especializado.
            </p>
            <div className="pt-1 text-xs text-slate-300">
              <span className="font-semibold text-slate-100">Propietario:</span> {siteConfig.owner}
            </div>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-4 text-xs uppercase tracking-wider">
              Categorías
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/catalogo?category=iPhone" className="hover:text-blue-400 transition">Apple iPhone</Link></li>
              <li><Link href="/catalogo?category=Samsung" className="hover:text-blue-400 transition">Samsung Galaxy</Link></li>
              <li><Link href="/catalogo?category=Xiaomi" className="hover:text-blue-400 transition">Xiaomi / Redmi</Link></li>
              <li><Link href="/catalogo?category=Motorola" className="hover:text-blue-400 transition">Motorola</Link></li>
              <li><Link href="/catalogo?category=Accesorios" className="hover:text-blue-400 transition">Accesorios & Cargadores</Link></li>
              <li><Link href="/catalogo?category=Repuestos" className="hover:text-blue-400 transition">Repuestos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-4 text-xs uppercase tracking-wider">
              Garantía & Servicios
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300">
                <Wrench className="w-3.5 h-3.5 text-emerald-400" /> Diagnóstico técnico rápido
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Equipos 100% verificados
              </li>
              <li className="text-slate-400">
                {siteConfig.pickupPolicy}
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-500 hover:text-slate-300 transition text-[11px] block mt-4">
                  Acceso Administrativo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-4 text-xs uppercase tracking-wider">
              Atención al Cliente
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-200">Horario de Atención:</div>
                  <div className="text-slate-400">{siteConfig.hours}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-200">Ubicación:</div>
                  <div className="text-slate-400">{siteConfig.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={'https://wa.me/' + siteConfig.whatsappNumber}
                  className="font-medium text-emerald-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Oficial
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </div>
          <div className="text-slate-400">
            Diseñado para venta y cotizaciones en tienda por WhatsApp.
          </div>
        </div>
      </div>
    </footer>
  );
}
