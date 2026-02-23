import { client } from "@/lib/shopify/serverClient";
import { getProducts, getProductByHandle } from "./graphql/query";

type PriceDetails = {
	amount: string;
	currencyCode: string;
};

type PriceInfo = {
	minVariantPrice: PriceDetails;
	maxVariantPrice: PriceDetails;
};
type ProductImage = {
	url: string;
	altText: string | "";
	width: number;
	height: number;
};
type ProductInfo = {
	id: string;
	title: string;
	handle: string;
	availableForSale: boolean;
	createdAt: string;
	featuredImage: ProductImage;
	priceRange: PriceInfo;
};

type ProductEdges = {
	cursor: string | null;
	node: ProductInfo;
};

type ProductResponse = {
	products: {
		edges: ProductEdges[];
		pageInfo: {
			hasNextPage: boolean;
			endCursor: string | null;
		};
	};
};

type ProductByHandleResponse = {
	product: ProductInfo | null;
};

// fetch one product by handle
export const getProduct = async (
	productHandle: string,
): Promise<ProductInfo | null> => {
	const resp = await client.request<ProductByHandleResponse>(
		getProductByHandle,
		{
			variables: {
				handle: productHandle,
			},
		},
	);

	if (resp.errors) {
		throw new Error("Product request failed.");
	}

	return resp.data?.product ?? null;
};

// fetch all products
export const getAllProducts = async (
	pageSize = 250,
): Promise<ProductInfo[]> => {
	const allProducts: ProductInfo[] = [];
	let hasNextPage = true;
	let cursor = null;

	while (hasNextPage) {
		const resp = await client.request<ProductResponse>(getProducts, {
			variables: {
				first: pageSize,
				after: cursor,
			},
		});

		if (resp.errors) {
			throw new Error("Product Request Failed.");
		}

		const products = resp.data?.products;

		if (!products) break;

		for (const edge of products.edges ?? []) {
			allProducts.push(edge.node);
		}

		hasNextPage = products.pageInfo.hasNextPage;
		cursor = products.pageInfo.endCursor;
	}

	return allProducts;
};
