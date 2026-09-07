import { PrismaClient, Role, ProductCondition, ProductStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed dinámico para TECNOLOGIA DEL CELULAR HD...');

  const defaultPassword = await bcrypt.hash('admin123456', 10);

  const adan = await prisma.user.upsert({
    where: { email: 'adan@celularhd.com' },
    update: { role: Role.ADMIN },
    create: {
      name: 'Adan Adellan',
      email: 'adan@celularhd.com',
      passwordHash: defaultPassword,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  const wilmer = await prisma.user.upsert({
    where: { email: 'wilmer@celularhd.com' },
    update: { role: Role.ADMIN },
    create: {
      name: 'Wilmer',
      email: 'wilmer@celularhd.com',
      passwordHash: defaultPassword,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  const vendedorDemo = await prisma.user.upsert({
    where: { email: 'vendedor@celularhd.com' },
    update: {},
    create: {
      name: 'Asesor Comercial HD',
      email: 'vendedor@celularhd.com',
      passwordHash: defaultPassword,
      role: Role.VENDEDOR,
      isActive: true,
    },
  });

  console.log('Usuarios creados / actualizados:');
  console.log(' - ' + adan.name + ' (' + adan.role + ')');
  console.log(' - ' + wilmer.name + ' (' + wilmer.role + ')');
  console.log(' - ' + vendedorDemo.name + ' (' + vendedorDemo.role + ')');

  const brandsData = [
    { name: 'Apple', slug: 'apple' },
    { name: 'Samsung', slug: 'samsung' },
    { name: 'Xiaomi', slug: 'xiaomi' },
    { name: 'Motorola', slug: 'motorola' },
    { name: 'Genérico Certificado', slug: 'generico-certificado' },
    { name: 'HD Shield', slug: 'hd-shield' },
  ];

  const brandsMap = new Map<string, string>();
  for (const b of brandsData) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { active: true },
      create: { name: b.name, slug: b.slug, active: true },
    });
    brandsMap.set(b.name, brand.id);
  }
  console.log('Marcas inicializadas: ' + brandsMap.size);

  const categoriesData = [
    { name: 'Celulares', slug: 'celulares', description: 'Smartphones y equipos móviles' },
    { name: 'iPhone', slug: 'iphone', description: 'Teléfonos Apple nuevos y seminuevos' },
    { name: 'Samsung', slug: 'samsung', description: 'Gama Galaxy S, A y Z' },
    { name: 'Xiaomi', slug: 'xiaomi', description: 'Smartphones Redmi, Poco y Xiaomi' },
    { name: 'Motorola', slug: 'motorola', description: 'Equipos Moto G y Edge' },
    { name: 'Accesorios', slug: 'accesorios', description: 'Cargadores certificados, cables y vidrios' },
    { name: 'Repuestos', slug: 'repuestos', description: 'Pantallas, baterías y módulos' },
    { name: 'Otros', slug: 'otros', description: 'Otros productos tecnológicos' },
  ];

  const categoriesMap = new Map<string, string>();
  for (const c of categoriesData) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { active: true },
      create: { name: c.name, slug: c.slug, description: c.description, active: true },
    });
    categoriesMap.set(c.name, cat.id);
  }
  console.log('Categorías inicializadas: ' + categoriesMap.size);

  const productsData = [
    {
      sku: 'IP13-128-BLU-USE',
      name: 'iPhone 13 128 GB',
      slug: 'iphone-13-128gb',
      description: 'Excelente estado cosmético 10/10, batería al 89%, libre para todo operador nacional e internacional. Incluye cable y cargador rápido de obsequio.',
      brandName: 'Apple',
      categoryName: 'iPhone',
      model: 'iPhone 13',
      price: 1850000,
      previousPrice: 2100000,
      stock: 4,
      status: ProductStatus.ACTIVE,
      condition: ProductCondition.USADO,
      warranty: '90 días con el local',
      isFeatured: true,
      hasActivePromotion: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
      ],
    },
    {
      sku: 'SAM-S23-256-BLK-NEW',
      name: 'Samsung Galaxy S23 256 GB',
      slug: 'samsung-galaxy-s23-256gb',
      description: 'Teléfono nuevo en caja sellada con garantía directa de fábrica. Potencia Snapdragon 8 Gen 2, pantalla Dynamic AMOLED 2X a 120Hz.',
      brandName: 'Samsung',
      categoryName: 'Samsung',
      model: 'Galaxy S23',
      price: 2450000,
      previousPrice: 2800000,
      stock: 6,
      status: ProductStatus.ACTIVE,
      condition: ProductCondition.NUEVO,
      warranty: '1 año de garantía',
      isFeatured: true,
      hasActivePromotion: false,
      images: [
        { url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
      ],
    },
    {
      sku: 'XIA-RN13P-256-GRN-NEW',
      name: 'Xiaomi Redmi Note 13 Pro 4G 256 GB',
      slug: 'xiaomi-redmi-note-13-pro-256gb',
      description: 'Increíble relación calidad-precio. Cámara principal de 200MP con OIS, carga ultra veloz de 67W y pantalla AMOLED fluida.',
      brandName: 'Xiaomi',
      categoryName: 'Xiaomi',
      model: 'Redmi Note 13 Pro',
      price: 980000,
      previousPrice: 1100000,
      stock: 8,
      status: ProductStatus.ACTIVE,
      condition: ProductCondition.NUEVO,
      warranty: '6 meses de garantía',
      isFeatured: true,
      hasActivePromotion: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
      ],
    },
    {
      sku: 'ACC-CHG-20W-PD',
      name: 'Cargador Rápido 20W USB-C con Cable',
      slug: 'cargador-rapido-20w-usb-c',
      description: 'Cargador de pared certificado con tecnología Power Delivery. Carga el 50% de tu dispositivo en solo 30 minutos.',
      brandName: 'Genérico Certificado',
      categoryName: 'Accesorios',
      model: 'PD 20W',
      price: 45000,
      previousPrice: 55000,
      stock: 25,
      status: ProductStatus.ACTIVE,
      condition: ProductCondition.NUEVO,
      warranty: '30 días de garantía',
      isFeatured: false,
      hasActivePromotion: false,
      images: [
        { url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
      ],
    },
    {
      sku: 'ACC-VID-9D-UNIV',
      name: 'Vidrio Templado 9D de Alta Resistencia',
      slug: 'vidrio-templado-9d',
      description: 'Protector de pantalla con bordes reforzados y dureza 9H. No afecta la sensibilidad táctil ni el brillo.',
      brandName: 'HD Shield',
      categoryName: 'Accesorios',
      model: 'Universal',
      price: 15000,
      stock: 50,
      status: ProductStatus.ACTIVE,
      condition: ProductCondition.NUEVO,
      warranty: 'Garantía de instalación en tienda',
      isFeatured: false,
      hasActivePromotion: false,
      images: [
        { url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
      ],
    },
  ];

  for (const prod of productsData) {
    const brandId = brandsMap.get(prod.brandName);
    const categoryId = categoriesMap.get(prod.categoryName);
    if (!brandId || !categoryId) continue;

    const { brandName, categoryName, images, ...productFields } = prod;

    const upsertedProduct = await prisma.product.upsert({
      where: { sku: prod.sku },
      update: {
        ...productFields,
        brandId,
        categoryId,
      },
      create: {
        ...productFields,
        brandId,
        categoryId,
      },
    });

    await prisma.productImage.deleteMany({ where: { productId: upsertedProduct.id } });
    for (const img of images) {
      await prisma.productImage.create({
        data: {
          productId: upsertedProduct.id,
          url: img.url,
          isPrimary: img.isPrimary,
          sortOrder: img.sortOrder,
        },
      });
    }
  }

  console.log('Productos y sus imágenes relacionados con éxito.');
  console.log('Seed FASE 3 completado con éxito.');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
