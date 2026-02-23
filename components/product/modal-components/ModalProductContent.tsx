"use client";

import React from "react";

interface ModalProductContentProps {
	title: string;
	description?: string;
	price?: string;
	code?: string;
	compareAtPrice?: string | null;
	availableForSale?: boolean;
}

export default function ModalProductContent({
	title,
	description = "",
	price,
	code,
	compareAtPrice = null,
	availableForSale = true,
}: ModalProductContentProps) {
	const hasPrice = Boolean(price && code);

	return (
		<div className='flex h-full flex-col gap-4'>
			<div className='space-y-2'>
				<h3 className='text-xl font-semibold leading-tight text-zinc-900'>
					{title}
				</h3>

				<div className='flex items-center gap-2'>
					{hasPrice ? (
						<>
							<p className='text-base font-medium text-zinc-900'>
								${price} {code}
							</p>
							{compareAtPrice ? (
								<p className='text-sm text-zinc-500 line-through'>
									${compareAtPrice}
								</p>
							) : null}
						</>
					) : (
						<p className='text-sm text-zinc-500'>Price unavailable</p>
					)}
				</div>

				<p
					className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
						availableForSale
							? "bg-emerald-50 text-emerald-700"
							: "bg-zinc-100 text-zinc-600"
					}`}>
					{availableForSale ? "In stock" : "Unavailable"}
				</p>
			</div>

			{description ? (
				<div className='space-y-2'>
					<h4 className='text-sm font-medium text-zinc-900'>Description</h4>
					<p className='text-sm leading-6 text-zinc-700 whitespace-pre-line'>
						{description}
					</p>
				</div>
			) : null}
		</div>
	);
}
