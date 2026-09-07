import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, promoConsent, items, notes } = body;

    if (!customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Teléfono de WhatsApp y productos del carrito requeridos' },
        { status: 400 }
      );
    }

    // 1. Upsert Customer
    const normalizedPhone = customerPhone.replace(/[^0-9+]/g, '');
    const customer = await prisma.customer.upsert({
      where: { whatsapp: normalizedPhone },
      update: {
        name: customerName || undefined,
        consentPromo: Boolean(promoConsent),
      },
      create: {
        name: customerName || 'Cliente WhatsApp',
        whatsapp: normalizedPhone,
        consentPromo: Boolean(promoConsent),
      },
    });

    // 2. Calcular total estimado
    const totalEstimated = items.reduce((acc: number, item: any) => {
      return acc + (Number(item.price) * Number(item.quantity));
    }, 0);

    const quoteNumber = 'COT-' + Date.now().toString().slice(-6);

    // 3. Crear Quote con sus QuoteItems
    const quote = await prisma.quote.create({
      data: {
        quoteNumber,
        status: 'PENDING_WHATSAPP',
        deliveryMethod: 'Recoger en tienda',
        totalEstimated,
        notes: notes || null,
        customerId: customer.id,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: Number(item.quantity) || 1,
            unitPrice: Number(item.price),
            subtotal: Number(item.price) * (Number(item.quantity) || 1),
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // 4. Crear Interaction separada
    await prisma.interaction.create({
      data: {
        type: 'WHATSAPP_QUOTE',
        channel: 'WhatsApp',
        summary: 'Cotización iniciada desde la web: ' + quoteNumber + ' por ' + items.length + ' producto(s)',
        customerId: customer.id,
        quoteId: quote.id,
        metadata: {
          totalEstimated,
          deliveryMethod: 'Recoger en tienda',
          productNames: items.map((i: any) => i.name),
        },
      },
    });

    return NextResponse.json({
      success: true,
      quoteId: quote.id,
      quoteNumber: quote.quoteNumber,
      customer: { id: customer.id, name: customer.name, whatsapp: customer.whatsapp },
    });
  } catch (error: any) {
    console.error('Error creating quote/interaction:', error);
    return NextResponse.json({ error: error.message || 'Error al registrar cotización' }, { status: 500 });
  }
}
