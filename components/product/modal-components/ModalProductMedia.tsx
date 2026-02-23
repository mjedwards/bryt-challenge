"use client";

import Image from "next/image";
import React from "react";

interface ModalProductMediaProps {
	imageUrl: string;
	imageAlt?: string;
}

export default function ModalProductMedia({
	imageUrl,
	imageAlt = "Product image",
}: ModalProductMediaProps) {
	return (
		<div className='w-full'>
			<div className='relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-zinc-100'>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={imageAlt}
						fill
						priority={false}
						className='object-cover'
						sizes='(max-width: 768px) 100vw, 50vw'
					/>
				) : (
					<div className='flex h-full w-full items-center justify-center text-sm text-zinc-500'>
						No image available
					</div>
				)}
			</div>
		</div>
	);
}
