import {
  PRODUCT_QUERY, SHOP_PRODUCTS_QUERY,
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
} from '../../../../graphql'
import { mockUser, mockProduct, mockProducts, mockImage, mockVariant, mockShopProductsVariables } from '../typeDefs';


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

const productQueryErrorMock = {
  request: { query: PRODUCT_QUERY, variables: { id: '123' } },
  result: {
    errors: [{ message: 'ack!' }],
  },
};

const productQueryNoProductMock = {
  request: { query: PRODUCT_QUERY, variables: { id: "123" } },
  result: {
    data: {
      product: null,
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

const updateProductMutationMock = {
  request: {
    query: UPDATE_PRODUCT_MUTATION,
    variables: {
      id: mockProduct.id,
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
      updateProduct: {
        __typename: 'Product',
        id: mockProduct.id,
      },
    },
  },
};

const updateProductMutationErrorMock = {
  request: {
    query: UPDATE_PRODUCT_MUTATION,
    variables: {
      id: mockProduct.id,
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

const shopProductsQueryFilterMock = ({ variables, products }) => {
  products = !products ? [] : mockProducts;
  return ({
    request: { query: SHOP_PRODUCTS_QUERY, variables },
    result: {
      data: {
        products
      },
    },
  });
};


export {
  productQueryMock, productQueryErrorMock, productQueryNoProductMock, productQueryNoVariantMock,
  shopProductsQueryFilterMock,
  createProductMutationMock, createProductMutationErrorMock,
  updateProductMutationMock, updateProductMutationErrorMock,
  deleteProductMutationMock,
}
