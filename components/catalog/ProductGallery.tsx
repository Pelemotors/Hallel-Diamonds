'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { WhatsAppButton } from './WhatsAppButton';

interface MediaItem {
  id?: string;
  url: string;
  alt?: string;
  kind: 'image' | 'video';
  sort_order: number;
}

interface ProductGalleryProps {
  media: MediaItem[];
  productName: string;
  productPrice?: string;
  productSlug?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ media, productName, productPrice, productSlug }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const normalizeImageUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    return `${baseUrl}/${url}`;
  };

  const images = media
    .filter(m => m.kind === 'image')
    .map(img => ({ ...img, url: normalizeImageUrl(img.url) }))
    .sort((a, b) => a.sort_order - b.sort_order);
  const mainImage = images[selectedIndex] || images[0];

  if (!mainImage) {
    return (
      <div className="aspect-[4/5] bg-surface rounded-lg flex items-center justify-center">
        <span className="text-text-secondary">אין תמונה זמינה</span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className="relative aspect-[4/5] bg-surface rounded-lg overflow-hidden cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
          aria-label="לחץ להגדלת התמונה"
        >
          <Image
            src={mainImage.url}
            alt={mainImage.alt || productName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedIndex === index
                    ? 'border-gold'
                    : 'border-transparent hover:border-border'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${productName} - תמונה ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12.5vw"
                />
              </button>
            ))}
          </div>
        )}

        {/* WhatsApp Button */}
        <div className="pt-4">
          <WhatsAppButton
            productName={productName}
            productPrice={productPrice}
            productSlug={productSlug}
            className="w-full"
          >
            צור קשר בוואטסאפ
          </WhatsAppButton>
        </div>
      </div>

      {/* Enhanced Lightbox with Zoom */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => {
            setIsLightboxOpen(false);
            setZoom(1);
            setPosition({ x: 0, y: 0 });
          }}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-white rounded z-10"
            onClick={() => {
              setIsLightboxOpen(false);
              setZoom(1);
              setPosition({ x: 0, y: 0 });
            }}
            aria-label="סגור תצוגה מוגדלת"
          >
            ✕
          </button>
          
          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((prev) => Math.min(prev + 0.5, 3));
              }}
              aria-label="הגדל"
            >
              +
            </button>
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((prev) => Math.max(prev - 0.5, 1));
                if (zoom <= 1) {
                  setPosition({ x: 0, y: 0 });
                }
              }}
              aria-label="הקטן"
            >
              −
            </button>
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(1);
                setPosition({ x: 0, y: 0 });
              }}
              aria-label="איפוס"
            >
              ↻
            </button>
          </div>

          <div
            ref={imageRef}
            className="relative max-w-4xl max-h-[90vh] w-full h-full cursor-move"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => {
              if (zoom > 1) {
                setIsDragging(true);
                setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
              }
            }}
            onMouseMove={(e) => {
              if (isDragging && zoom > 1) {
                setPosition({
                  x: e.clientX - dragStart.x,
                  y: e.clientY - dragStart.y,
                });
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onWheel={(e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              setZoom((prev) => Math.max(1, Math.min(3, prev + delta)));
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              }}
            >
              <Image
                src={mainImage.url}
                alt={mainImage.alt || productName}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-white rounded z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev + 1) % images.length);
                  setZoom(1);
                  setPosition({ x: 0, y: 0 });
                }}
                aria-label="תמונה הבאה"
              >
                ‹
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-white rounded z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
                  setZoom(1);
                  setPosition({ x: 0, y: 0 });
                }}
                aria-label="תמונה קודמת"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

