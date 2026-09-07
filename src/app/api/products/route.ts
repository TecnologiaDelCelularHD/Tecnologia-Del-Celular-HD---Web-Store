// src/app/api/products/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/db/prisma';
import { z } from 'zod';

// Validation schemas using zod
const createSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number().int().nonnegative(),
  previousPrice: z.number().int().nonnegative().optional(),
  stock: z.number().int().nonnegative(),
  condition: z.enum(['NUEVO', 'USADO', 'REACONDICIONADO']),
  warranty: z.string().optional(),
  isFeatured: z.boolean().optional(),
  hasActivePromotion: z.boolean().optional(),
  brandId: z.string().min(1),
  categoryId: z.string().min(1),
  features: z.array(z.string()).optional(),
  images: z.array(
    z.object({
      url: z.string().url(),
      alt: z.string().optional(),
      sortOrder: z.number().int().optional(),
      isPrimary: z.boolean().optional(),
    })
  ).optional(),
});

const updateSchema = z.object({
  name: z.string().optional(),
  sku: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number().int().nonnegative().optional(),
  previousPrice: z.number().int().nonnegative().optional().nullable(),
  stock: z.number().int().nonnegative().optional(),
  condition: z.enum(['NUEVO', 'USADO', 'REACONDICIONADO']).optional(),
  warranty: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  hasActivePromotion: z.boolean().optional(),
  brandId: z.string().optional(),
  categoryId: z.string().optional(),
  features: z.array(z.string()).optional(),
  images: z.array(
    z.object({
      url: z.string().url(),
      alt: z.string().optional(),
      sortOrder: z.number().int().optional(),
      isPrimary: z.boolean().optional(),
    })
  ).optional(),
});

/** Helper to generate slug if not provided */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** GET /api/products – list with pagination & filters */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(parseInt(searchParams.get('page') ?? '1'), 1);
    const limit = Math.max(parseInt(searchParams.get('limit') ?? '20'), 1);
    const search = searchParams.get('search') ?? '';
    const brandId = searchParams.get('brandId');
    const categoryId = searchParams.get('categoryId');
    const condition = searchParams.get('condition');
    const status = searchParams.get('status'); // ACTIVE, INACTIVE, HIDDEN
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const order = searchParams.get('order'); // e.g., price_desc

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { name: { contains: search, mode: 'insensitive' } } },
        { category: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    if (brandId) where.brandId = brandId;
    if (categoryId) where.categoryId = categoryId;
    if (condition) where.condition = condition;
    if (status) where.status = status;
    if (priceMin) where.price = { gte: Number(priceMin) };
    if (priceMax) {
      where.price = { ...(where.price || {}), lte: Number(priceMax) };
    }

    const orderBy: any = {};
    if (order) {
      const [field, dir] = order.split('_');
      orderBy[field] = dir?.toLowerCase() === 'desc' ? 'desc' : 'asc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: { brand: true, category: true, images: true },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return NextResponse.json({ products, total, page, limit, totalPages });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

/** POST /api/products – create a new product */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.parse(body);
    const slug = parsed.slug ?? generateSlug(parsed.name);

    const product = await prisma.product.create({
      data: {
        name: parsed.name,
        sku: parsed.sku,
        slug,
        description: parsed.description ?? '',
        price: parsed.price,
        previousPrice: parsed.previousPrice ?? null,
        stock: parsed.stock,
        status: 'ACTIVE',
        condition: parsed.condition,
        warranty: parsed.warranty ?? null,
        isFeatured: parsed.isFeatured ?? false,
        hasActivePromotion: parsed.hasActivePromotion ?? false,
        brandId: parsed.brandId,
        categoryId: parsed.categoryId,
      },
    });

    if (Array.isArray(parsed.features) && parsed.features.length) {
      await prisma.product.update({
        where: { id: product.id },
        data: { features: { set: parsed.features } },
      });
    }
    if (Array.isArray(parsed.images) && parsed.images.length) {
      const imageCreates = parsed.images.map((img) => ({
        url: img.url,
        alt: img.alt ?? null,
        sortOrder: img.sortOrder ?? 0,
        isPrimary: img.isPrimary ?? false,
        productId: product.id,
      }));
      await prisma.productImage.createMany({ data: imageCreates });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message ?? 'Error al crear producto' }, { status: 500 });
  }
}

/** PATCH /api/products/:id – partial update */
export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
    }
    const body = await request.json();
    const parsed = updateSchema.parse(body);

    const data: any = {};
    const updatableFields = [
      'name',
      'sku',
      'slug',
      'description',
      'price',
      'previousPrice',
      'stock',
      'condition',
      'warranty',
      'isFeatured',
      'hasActivePromotion',
      'brandId',
      'categoryId',
    ];
    for (const field of updatableFields) {
      if (parsed[field] !== undefined) {
        data[field] = parsed[field];
      }
    }

    const product = await prisma.product.update({ where: { id }, data });

    if (Array.isArray(parsed.images)) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      const imageCreates = parsed.images.map((img) => ({
        url: img.url,
        alt: img.alt ?? null,
        sortOrder: img.sortOrder ?? 0,
        isPrimary: img.isPrimary ?? false,
        productId: id,
      }));
      await prisma.productImage.createMany({ data: imageCreates });
    }

    if (Array.isArray(parsed.features)) {
      await prisma.product.update({
        where: { id },
        data: { features: { set: parsed.features } },
      });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message ?? 'Error al actualizar producto' }, { status: 500 });
  }
}

/** DELETE /api/products/:id – soft delete (status -> INACTIVE) */
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
    }
    const product = await prisma.product.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error soft deleting product:', error);
    return NextResponse.json({ error: error.message ?? 'Error al eliminar producto' }, { status: 500 });
  }
}

