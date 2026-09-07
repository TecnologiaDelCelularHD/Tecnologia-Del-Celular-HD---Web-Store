// src/app/api/brands/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/db/prisma';
import { z } from 'zod';

// Validation schemas
const createSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  logo: z.string().url().optional(),
  active: z.boolean().optional().default(true),
});

const updateSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  logo: z.string().url().optional(),
  active: z.boolean().optional(),
});

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** GET /api/brands – pagination, search, active filter */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(parseInt(searchParams.get('page') ?? '1'), 1);
  const limit = Math.max(parseInt(searchParams.get('limit') ?? '20'), 1);
  const search = searchParams.get('search') ?? '';
  const active = searchParams.get('active');

  const where: any = {};
  if (search) {
    where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { slug: { contains: search, mode: 'insensitive' } }];
  }
  if (active !== null) {
    where.active = active === 'true';
  } else {
    where.active = true;
  }

  const [total, brands] = await Promise.all([
    prisma.brand.count({ where }),
    prisma.brand.findMany({
      where,
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);
  return NextResponse.json({ brands, total, page, limit, totalPages });
}

/** POST /api/brands – create brand */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.parse(body);
    const slug = parsed.slug ?? generateSlug(parsed.name);
    const brand = await prisma.brand.create({
      data: {
        name: parsed.name,
        slug,
        logo: parsed.logo,
        active: parsed.active,
      },
    });
    return NextResponse.json(brand, { status: 201 });
  } catch (error: any) {
    console.error('Error creating brand', error);
    return NextResponse.json({ error: error.message ?? 'Error al crear marca' }, { status: 500 });
  }
}

/** PATCH /api/brands/:id – update fields */
export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    if (!id) throw new Error('Missing brand id');
    const body = await req.json();
    const parsed = updateSchema.parse(body);
    const data: any = {};
    if (parsed.name) data.name = parsed.name;
    if (parsed.slug) data.slug = parsed.slug;
    if (parsed.logo !== undefined) data.logo = parsed.logo;
    if (parsed.active !== undefined) data.active = parsed.active;
    if (Object.keys(data).length === 0) throw new Error('No fields to update');
    const brand = await prisma.brand.update({ where: { id }, data });
    return NextResponse.json(brand);
  } catch (error: any) {
    console.error('Error updating brand', error);
    return NextResponse.json({ error: error.message ?? 'Error al actualizar marca' }, { status: 500 });
  }
}

/** DELETE /api/brands/:id – soft delete */
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    if (!id) throw new Error('Missing brand id');
    const productCount = await prisma.product.count({ where: { brandId: id, active: true } });
    if (productCount > 0) {
      return NextResponse.json({ error: 'No se puede eliminar marca con productos activos' }, { status: 400 });
    }
    const brand = await prisma.brand.update({ where: { id }, data: { active: false } });
    return NextResponse.json(brand);
  } catch (error: any) {
    console.error('Error deleting brand', error);
    return NextResponse.json({ error: error.message ?? 'Error al eliminar marca' }, { status: 500 });
  }
}
