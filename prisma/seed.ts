import { PrismaClient, Role, ProductCondition, ProductStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed para TECNOLOGIA DEL CELULAR HD...');

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

  console.log('Usuarios creados:');
  console.log(' - ' + adan.name + ' (' + adan.role + ')');
  console.log(' - ' + wilmer.name + ' (' + wilmer.role + ')');
  console.log(' - ' + vendedorDemo.name + ' (' + vendedorDemo.role + ')');

  const categoriesData = [
    { name: 'iPhone', slug: 'iphone', description: 'Teléfonos Apple nuevos y seminuevos garantizados' },
    { name: 'Samsung', slug: 'samsung', description: 'Gama Galaxy S, A y Z' },
    { name: 'Xiaomi', slug: 'xiaomi', description: 'Smartphones Redmi, Poco y Xiaomi' },
    { name: 'Motorola', slug: 'motorola', description: 'Equipos Moto G y Edge' },
    { name: 'Accesorios', slug: 'accesorios', description: 'Cargadores certificados, cables y vidrios templados' },
    { name: 'Repuestos', slug: 'repuestos', description: 'Pantallas, baterías y módulos técnicos' },
    { name: 'Otros', slug: 'otros', description: 'Otros productos tecnológicos' },
  ];

  const categoriesMap = new Map<string, string>();

  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoriesMap.set(cat.name, created.id);
  }
  console.log('Categorías inicializadas: ' + categoriesMap.size);

  const productsData = [
    {
      internalCode: 'CEL-IPH-001',
      name: 'iPhone 13 128 GB',
      slug: 'iphone-13-128gb',
      description: 'Excelente estado cosmético 10/10, batería al 89%, libre para todo operador nacional e internacional. Incluye cable y cargador rápido de obsequio.',
      categoryName: 'iPhone',
      brand: 'Apple',
      model: 'iPhone 13',
      price: 1850000,
      previousPrice: 2100000,
      discountPercentage: 12,
      stock: 4,
      status: ProductStatus.AVAILABLE,
      condition: ProductCondition.USADO,
      warranty: '90 días con el local',
      features: ['128 GB Almacenamiento', 'Batería 89%', 'Cámara dual 12MP', 'Pantalla Super Retina XDR OLED', 'Face ID perfecto'],
      images: ['https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80'],
      isFeatured: true,
      hasActivePromotion: true,
    },
    {
      internalCode: 'CEL-SAM-001',
      name: 'Samsung Galaxy S23 256 GB',
      slug: 'samsung-galaxy-s23-256gb',
      description: 'Teléfono nuevo en caja sellada con garantía directa de fábrica. Potencia Snapdragon 8 Gen 2, pantalla Dynamic AMOLED 2X a 120Hz.',
      categoryName: 'Samsung',
      brand: 'Samsung',
      model: 'Galaxy S23',
      price: 2450000,
      previousPrice: 2800000,
      discountPercentage: 13,
      stock: 6,
      status: ProductStatus.AVAILABLE,
      condition: ProductCondition.NUEVO,
      warranty: '1 año de garantía',
      features: ['256 GB / 8 GB RAM', 'Snapdragon 8 Gen 2', 'Cámara 50 MP', 'Carga rápida 25W', 'Resistencia IP68'],
      images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'],
      isFeatured: true,
      hasActivePromotion: false,
    },
    {
      internalCode: 'CEL-XIA-001',
      name: 'Xiaomi Redmi Note 13 Pro 4G 256 GB',
      slug: 'xiaomi-redmi-note-13-pro-256gb',
      description: 'Increíble relación calidad-precio. Cámara principal de 200MP con OIS, carga ultra veloz de 67W y pantalla AMOLED fluida.',
      categoryName: 'Xiaomi',
      brand: 'Xiaomi',
      model: 'Redmi Note 13 Pro',
      price: 980000,
      previousPrice: 1100000,
      discountPercentage: 11,
      stock: 8,
      status: ProductStatus.AVAILABLE,
      condition: ProductCondition.NUEVO,
      warranty: '6 meses de garantía',
      features: ['256 GB Almacenamiento', '8 GB RAM', 'Cámara 200 MP', 'Carga turbo 67W', 'Sensor de huella en pantalla'],
      images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
      isFeatured: true,
      hasActivePromotion: true,
    },
    {
      internalCode: 'ACC-CHG-001',
      name: 'Cargador Rápido 20W USB-C con Cable',
      slug: 'cargador-rapido-20w-usb-c',
      description: 'Cargador de pared certificado con tecnología Power Delivery. Carga el 50% de tu dispositivo en solo 30 minutos.',
      categoryName: 'Accesorios',
      brand: 'Genérico Certificado',
      model: 'PD 20W',
      price: 45000,
      previousPrice: 55000,
      discountPercentage: 18,
      stock: 25,
      status: ProductStatus.AVAILABLE,
      condition: ProductCondition.NUEVO,
      warranty: '30 días de garantía',
      features: ['Carga rápida 20W', 'Conexión USB-C a Lightning / Type-C', 'Protección contra sobrecargas'],
      images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'],
      isFeatured: false,
      hasActivePromotion: false,
    },
    {
      internalCode: 'ACC-VID-001',
      name: 'Vidrio Templado 9D de Alta Resistencia',
      slug: 'vidrio-templado-9d',
      description: 'Protector de pantalla con bordes reforzados y dureza 9H. No afecta la sensibilidad táctil ni el brillo.',
      categoryName: 'Accesorios',
      brand: 'HD Shield',
      model: 'Universal',
      price: 15000,
      stock: 50,
      status: ProductStatus.AVAILABLE,
      condition: ProductCondition.NUEVO,
      warranty: 'Garantía de instalación en tienda',
      features: ['Dureza 9H', 'Bordes curvados 9D', 'Tratamiento oleofóbico'],
      images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80'],
      isFeatured: false,
      hasActivePromotion: false,
    },
  ];

  for (const prod of productsData) {
    const categoryId = categoriesMap.get(prod.categoryName);
    if (!categoryId) continue;

    const { categoryName, ...rest } = prod;
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        ...rest,
        categoryId,
      },
    });
  }

  console.log('Productos demo insertados correctamente.');
  console.log('Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
