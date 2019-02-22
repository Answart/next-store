import {
  CREATE_PROD_VARIANT_MUTATION,
  UPDATE_PROD_VARIANT_MUTATION,
  DELETE_PROD_VARIANT_MUTATION
} from '../../../../graphql'
import { mockImage, mockProduct, mockVariant } from '../typeDefs';



const createProductVariantMutationMock = {
  request: {
    query: CREATE_PROD_VARIANT_MUTATION,
    variables: {
      color: mockVariant.color,
      size: mockVariant.size,
      quantity: mockVariant.quantity,
      price: mockVariant.price,
      sale: mockVariant.sale,
      salePrice: mockVariant.salePrice,
      productId: mockProduct.id,
      imageId: mockImage.id
    },
  },
  result: {
    data: {
      createProductVariant: {
        __typename: 'Variant',
        ...mockVariant,
        product: {
          ...mockProduct,
          image: {
            ...mockImage
          },
        },
        image: {
          ...mockImage
        },
      },
    },
  },
};

const createProductVariantMutationErrorMock = {
  request: {
    query: CREATE_PROD_VARIANT_MUTATION,
    variables: {
      color: '',
      size: '',
      quantity: 1,
      price: 1,
      sale: false,
      salePrice: 1,
      productId: mockProduct.id,
      imageId: mockImage.id
    },
  },
  result: {
    errors: [{ message: 'ack!' }],
  }
};

const updateProductVariantMutationMock = {
  request: {
    query: UPDATE_PROD_VARIANT_MUTATION,
    variables: {
      id: mockVariant.id,
      color: mockVariant.color,
      size: mockVariant.size,
      quantity: mockVariant.quantity,
      price: mockVariant.price,
      sale: mockVariant.sale,
      salePrice: mockVariant.salePrice,
      imageId: mockImage.id,
    },
  },
  result: {
    data: {
      updateProductVariant: {
        __typename: 'Variant',
        id: mockVariant.id,
        product: {
          __typename: 'Product',
          id: mockProduct.id,
        }
      },
    },
  },
};

const deleteProductVariantMutationMock = {
  request: { query: DELETE_PROD_VARIANT_MUTATION, variables: { id: mockVariant.id } },
  result: {
    data: {
      deleteProductVariant: {
        __typename: 'Variant',
        id: mockVariant.id,
      },
    },
  },
};


export {
  createProductVariantMutationMock, createProductVariantMutationErrorMock,
  updateProductVariantMutationMock,
  deleteProductVariantMutationMock
};
