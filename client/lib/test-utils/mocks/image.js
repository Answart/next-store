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


const createImageMutationMock = {
  request: {
    query: CREATE_IMAGE_MUTATION,
    variables: { ...mockImageVariables },
  },
  result: {
    data: {
      createImage: {
        __typename: 'Image',
        id: mockImage.id,
      },
    },
  },
};


export {
  mockImage, mockImageVariables,
  createImageMutationMock,
}
