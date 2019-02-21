import {
  CREATE_PROD_VARIANT_MUTATION,
  DELETE_PROD_VARIANT_MUTATION
} from '../../../graphql'
import { mockImage, mockProduct, mockVariant } from '../utils';


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
  createProductVariantMutationMock,
  deleteProductVariantMutationMock
};
