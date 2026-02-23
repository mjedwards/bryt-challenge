// get general shop information
export const getShop = `#graphql
  query getShop {
    shop {
      name
      description

    }
  }
` as const;

// get product information for shop
export const getProducts = `#graphql
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
      cursor
      node {
        id
        title
        handle
        availableForSale
        createdAt
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    }
}
` as const;
