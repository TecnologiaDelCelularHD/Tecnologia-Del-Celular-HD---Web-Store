'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function WhatsAppFloatingButton() {
  const message = 'Hola, tengo una pregunta sobre sus celulares y servicios técnicos en Tecnología del Celular HD.';
  const link = 'https://wa.me/' + siteConfig.whatsappNumber + '?text=' + encodeURIComponent(message);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Hablar por WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-white" />
      <span className="text-sm hidden sm:inline-block">¿Dudas? Escríbenos</span>
    </a>
  );
}
