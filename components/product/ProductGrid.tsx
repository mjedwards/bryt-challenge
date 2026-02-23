"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Currency = {
	amount: string;
	currencyCode: string;
};

type ProductGridItem = {
	id: string;
	title: string;
	handle: string;
	availableForSale: boolean;
	createdAt: string;
	featuredImage: {
		url: string;
		altText: string | null;
		width: number;
		height: number;
	};
	priceRange: {
		minVariantPrice: Currency;
		maxVariantPrice: Currency;
	};
};
interface ProductGridProps {
	productItems: ProductGridItem[];
}

export default function ProductGrid({ productItems }: ProductGridProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProductHandle, setSelectedProductHandle] = useState<
		string | null
	>(null);

	const handleOpenModal = (productHandle: string) => {
		setIsModalOpen(true);
		setSelectedProductHandle(productHandle);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
			<QuickViewModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				productHandle={selectedProductHandle ? selectedProductHandle : ''}
			/>
			{productItems &&
				productItems.map((product) => {
					return (
						<div className='w-full bg-[#2A2A2A] rounded-lg' key={product.id}>
							<ProductCard
								image={product.featuredImage.url || ""}
								handle={product.handle}
								imageAlt={product.featuredImage.altText || ""}
								title={product.title}
								price={product.priceRange.minVariantPrice.amount}
								code={product.priceRange.minVariantPrice.currencyCode}
								openModal={handleOpenModal}
							/>
						</div>
					);
				})}
		</div>
	);
}
