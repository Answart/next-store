import { CREATE_IMAGE_MUTATION } from '../../../graphql'
import { fakeImage } from '../utils';

const mockImage = fakeImage();
const mockImageVariables = {
  cloudinary_id: mockImage.cloudinary_id,
  name: mockImage.name,
  height: mockImage.height,
  width: mockImage.width,
  transformation: mockImage.transformation,
  image_url: mockImage.image_url,
  large_image_url: mockImage.large_image_url
}


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
  mockImage, mockImageVariables,
  createImageMutationMock, createImageMutationErrorMock,
}
