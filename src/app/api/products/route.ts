import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const condition = searchParams.get('condition');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    const where: any = {
      status: { not: 'HIDDEN' },
    };

    if (category && category !== 'all') {
      where.category = { slug: category.toLowerCase() };
    }

    if (condition && condition !== 'all') {
      where.condition = condition;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      brand,
      model,
      price,
      previousPrice,
      discountPercentage,
      stock,
      status,
      condition,
      warranty,
      features,
      images,
      categoryId,
      isFeatured,
      hasActivePromotion,
      internalCode,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        brand,
        model,
        price: Number(price),
        previousPrice: previousPrice ? Number(previousPrice) : null,
        discountPercentage: discountPercentage ? Number(discountPercentage) : null,
        stock: Number(stock) || 0,
        status: status || 'AVAILABLE',
        condition: condition || 'NUEVO',
        warranty: warranty || null,
        features: features || [],
        images: images || [],
        categoryId,
        isFeatured: Boolean(isFeatured),
        hasActivePromotion: Boolean(hasActivePromotion),
        internalCode: internalCode || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message || 'Error al crear producto' }, { status: 500 });
  }
}
