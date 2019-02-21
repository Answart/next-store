import { CREATE_IMAGE_MUTATION } from '../../../../graphql'
import { mockImage, mockImageVariables } from '../typeDefs';


const createImageMutationMock = (overrides) => ({
  request: {
    query: CREATE_IMAGE_MUTATION,
    variables: {
      ...mockImageVariables,
      ...overrides,
    },
  },
  result: {
    data: {
      createImage: {
        __typename: 'Image',
        id: mockImage.id,
      },
    },
  },
});

const createImageMutationErrorMock = {
  request: {
    query: CREATE_IMAGE_MUTATION,
    variables: {
      ...mockImageVariables,
      cloudinary_id: '',
      name: '',
    },
  },
  result: {
    errors: [{ message: 'ack!' }],
  }
};


export {
  createImageMutationMock, createImageMutationErrorMock,
}
