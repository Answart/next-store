import {
  DELETE_PROD_VARIANT_MUTATION
} from '../../../graphql'
import { mockImage, mockProduct, mockVariant } from '../utils';



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
  deleteProductVariantMutationMock
};
