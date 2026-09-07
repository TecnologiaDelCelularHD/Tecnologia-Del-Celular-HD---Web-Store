export type ProductCategory = 
 | 'Celulares'
 | 'iPhone'
 | 'Samsung'
 | 'Xiaomi'
 | 'Motorola'
 | 'Accesorios'
 | 'Repuestos'
 | 'Otros';

export type ProductStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'HIDDEN';
export type ProductCondition = 'NUEVO' | 'USADO' | 'REACONDICIONADO';

export interface Product {
 id: string;
 name: string;
 slug: string;
 description: string;
 category: ProductCategory;
 brand: string;
 model: string;
 price: number;
 previousPrice?: number;
 discountPercentage?: number;
 stock: number;
 status: ProductStatus;
 condition: ProductCondition;
 warranty?: string;
 features: string[];
 images: string[];
 isFeatured: boolean;
 hasActivePromotion: boolean;
 createdAt: string;
 updatedAt: string;
}

export interface CartItem {
 product: Product;
 quantity: number;
}
