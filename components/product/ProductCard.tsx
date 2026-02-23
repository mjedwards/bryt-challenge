"use client";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
	image: string;
  handle: string;
	imageAlt: string | "";
	title: string;
	price: string;
	code: string;
	openModal: (productHandle: string) => void;
}
export default function ProductCard(product: ProductCardProps) {
	const { image, handle, imageAlt, title, price, code, openModal } = product;
  
	return (
		<div className='flex flex-col h-full w-full cursor-pointer p-3 text-white'>
			<div className='relative aspect-[4.95/5] w-full overflow-hidden rounded-lg bg-white'>
				<Image
					className='object-cover transition-transform duration-300 hover:scale-[1.02]'
					src={image}
					alt={imageAlt}
					fill
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
				/>
			</div>
			<div className='mt-3 flex flex-1 flex-col'>
				<h3 className='line-clamp-2 min-h-10 text-sm font-medium leading-5'>
					{title}
				</h3>
				<div className='flex flex-row justify-between mt-3'>
					<span>
						${price} {code}
					</span>
					<button type='button' className='cursor-pointer' onClick={() =>openModal(handle)}>
						Quick View
					</button>
				</div>
			</div>
		</div>
	);
}
