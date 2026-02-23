// get general shop information
export const getShop = `#graphql
  query getShop {
    shop {
      name
      description

    }
  }
` as const;

// get one product details (for the quick view modal)
export const getProductByHandle = `#graphql
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      featuredImage {
        url
        altText
        width
        height
      }
      options {
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
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
        featuredImage {
          url
          altText
          width
          height
        }
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
