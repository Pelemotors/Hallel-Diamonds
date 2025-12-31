'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WhatsAppButton } from './WhatsAppButton';

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_desc?: string;
  price_display?: string;
  price_numeric?: number;
  is_featured?: boolean;
  media?: Array<{
    url: string;
    alt?: string;
    sort_order: number;
    kind?: string;
  }>;
  product_media?: Array<{
    url: string;
    alt?: string;
    sort_order: number;
    kind?: string;
  }>;
}

interface ProductCardProps {
  product: Product;
  brandSlug?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, brandSlug }) => {
  const media = product.product_media || product.media || [];
  const mainImage = media.find((m: any) => m.kind === 'image') || media[0];
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const rawImageUrl = mainImage?.url || '/demo/rings.jpg';
  const imageUrl = rawImageUrl.startsWith('http') 
    ? rawImageUrl 
    : rawImageUrl.startsWith('/') 
    ? `${baseUrl}${rawImageUrl}`
    : `${baseUrl}/${rawImageUrl}`;

  return (
    <div className="product-card-hover bg-surface rounded-lg overflow-hidden border border-border animate-fade-in">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] bg-background overflow-hidden">
          <Image
            src={imageUrl}
            alt={mainImage?.alt || `${product.name} - תכשיט יוקרה`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            loading="lazy"
          />
          {product.is_featured && (
            <div className="absolute top-2 right-2 bg-gold text-text-primary px-2 py-1 rounded text-xs font-semibold shadow-lg animate-pulse-slow">
              מומלץ
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4 space-y-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-heading text-h3 text-text-primary hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {product.short_desc && (
          <p className="text-small text-text-secondary line-clamp-2">
            {product.short_desc}
          </p>
        )}
        
        {product.price_display && (
          <div className="text-h3 font-heading font-semibold text-text-primary">
            {product.price_display}
          </div>
        )}
        
        <WhatsAppButton
          productName={product.name}
          productPrice={product.price_display || ''}
          productSlug={product.slug}
          className="w-full"
        />
      </div>
    </div>
  );
};

