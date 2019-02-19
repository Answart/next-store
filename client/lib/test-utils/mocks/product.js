import {
  PRODUCT_QUERY, SHOP_PRODUCTS_QUERY,
  CREATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
} from '../../../graphql'
import { fakeProduct } from '../utils';
import { mockUser } from './user';
import { mockImage } from './image';
import { mockVariant } from './variant';

const mockProduct = fakeProduct();
const mockShopProductsVariables = {
  name: mockUser.name,
  orderBy: 'createdAt_DESC',
  skip: 0,
  first: 1
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

const createProductMutationMock = {
  request: {
    query: CREATE_PRODUCT_MUTATION,
    variables: {
      department: mockProduct.department,
      title: mockProduct.title,
      description: mockProduct.description,
      category: mockProduct.category,
      brand: mockProduct.brand,
      online: mockProduct.online,
      imageId: mockImage.id,
    },
  },
  result: {
    data: {
      createProduct: {
        __typename: 'Product',
        id: mockProduct.id,
      },
    },
  },
};

const createProductMutationErrorMock = {
  request: {
    query: CREATE_PRODUCT_MUTATION,
    variables: {
      department: 'tops',
      title: '',
      description: '',
      category: '',
      brand: '',
      online: false,
      imageId: mockImage.id,
    },
  },
  result: {
    errors: [{ message: 'ack!' }],
  }
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


export {
  mockProduct, mockShopProductsVariables,
  productQueryMock, productQueryNoVariantMock,
  shopProductsQueryNameEmptyMock, shopProductsQueryProductMock,
  createProductMutationMock, createProductMutationErrorMock,
  deleteProductMutationMock,
}
