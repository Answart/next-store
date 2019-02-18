import {
  PRODUCT_QUERY, SHOP_PRODUCTS_QUERY,
  DELETE_PRODUCT_MUTATION,
} from '../graphql';
import {
  fakeProduct,
} from './testUtils';
import {
  mockUser, mockImage, mockVariant,
} from './test-utils/mocks';

const mockProduct = fakeProduct();
const mockShopProductsVariables = {
  name: mockUser.name,
  orderBy: 'createdAt_DESC',
  skip: 0,
  first: 1
 };


const shopProductsQueryNameEmptyMock = {
  request: { query: SHOP_PRODUCTS_QUERY, variables: { name: mockUser.name }},
  result: {
    data: {
      products: [],
    },
  },
};

const shopProductsQueryProductMock = {
  request: { query: SHOP_PRODUCTS_QUERY, variables: { ...mockShopProductsVariables }},
  result: {
    data: {
      products: [{
        ...mockProduct,
        image: mockImage,
        user: {
          __typename: mockUser.__typename,
          id: mockUser.id,
          name: mockUser.name,
        },
        variants: [{
          ...mockVariant,
          product: {
            __typename: mockProduct.__typename,
            id: mockProduct.id,
            image: mockImage
          }
        }]
      }],
    },
  },
};

const productQueryMock = {
  request: { query: PRODUCT_QUERY, variables: { id: mockProduct.id } },
  result: {
    data: {
      product: {
        ...mockProduct,
        __typename: mockProduct.__typename,
        image: mockImage,
        user: {
          __typename: mockUser.__typename,
          id: mockUser.id,
          name: mockUser.name,
        },
        variants: [{
          ...mockVariant,
          product: {
            __typename: mockProduct.__typename,
            id: mockProduct.id,
            image: mockImage
          }
        }]
      },
    },
  },
};

const productQueryNoVariantMock = {
  request: { query: PRODUCT_QUERY, variables: { id: mockProduct.id } },
  result: {
    data: {
      product: {
        ...mockProduct,
        __typename: mockProduct.__typename,
        image: mockImage,
        user: {
          __typename: mockUser.__typename,
          id: mockUser.id,
          name: mockUser.name,
        },
        variants: []
      },
    },
  },
};

const deleteProductMutationMock = {
  request: { query: DELETE_PRODUCT_MUTATION, variables: { id: mockProduct.id } },
  result: {
    data: {
      deleteProduct: {
        __typename: 'Product',
        id: mockProduct.id,
      },
    },
  },
};


export {
  mockShopProductsVariables,
  shopProductsQueryNameEmptyMock,
  shopProductsQueryProductMock,
  deleteProductMutationMock,
  productQueryMock,
  productQueryNoVariantMock,
};