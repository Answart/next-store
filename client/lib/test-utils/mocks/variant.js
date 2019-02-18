import {
  DELETE_PROD_VARIANT_MUTATION
} from '../../../graphql'
import { fakeVariant } from '../utils';

const mockVariant = fakeVariant();


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
  mockVariant,
  deleteProductVariantMutationMock
};
