"use client";
import React, { useEffect, useState } from "react";
import ProductCTA from "./ProductCTA";
import ModalProductMedia from "./modal-components/ModalProductMedia";
import ModalProductContent from "./modal-components/ModalProductContent";
import { getProduct } from "@/lib/shopify/products";

interface QuickOverviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	productHandle: string;
}

export default function QuickViewModal({
	isOpen,
	onClose,
	productHandle,
}: QuickOverviewModalProps) {
	const [product, setProduct] = useState<unknown>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isOpen || !productHandle) return;

		let cancelled = false;

		const fetchProduct = async () => {
			try {
				setLoading(true);
				setError(null);

				const res = await fetch(
					`/api/product?handle=${encodeURIComponent(productHandle)}`,
				);

				if (!res.ok) throw new Error("Failed to fetch product");

				const data = await res.json();
				console.log(data);
				if (!cancelled) {
					setProduct(data.product);
				}
			} catch (err) {
				if (!cancelled) {
					console.error(err);
					setError("Failed to load product.");
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		fetchProduct();

		return () => {
			cancelled = true;
		};
	}, [isOpen, productHandle]);

	if (!isOpen) return null;
	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'
			onClick={onClose}>
			<div
				className='w-full max-w-2xl rounded-lg bg-white p-6 text-black'
				onClick={(e) => e.stopPropagation()}>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-semibold'>Quick View</h2>
					<button type='button' onClick={onClose} className='cursor-pointer'>
						Close
					</button>
				</div>

				{/* product details layout*/}
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
					<ModalProductMedia
						imageUrl={product.featuredImage?.url ?? ""}
						imageAlt={product.featuredImage?.altText ?? product.title}
					/>

					<ModalProductContent
						title={product.title}
						description={product.description ?? ""}
						price={product.priceRange?.minVariantPrice?.amount ?? ""}
						code={product.priceRange?.minVariantPrice?.currencyCode ?? ""}
						availableForSale={product.availableForSale ?? true}
					/>
				</div>
				{/* CTA ADD TO BAG */}
				<div>
					<ProductCTA />
				</div>
			</div>
		</div>
	);
}
