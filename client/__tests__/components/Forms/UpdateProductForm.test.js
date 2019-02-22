import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import { UpdateProductForm } from '../../../components/Forms';
import {
  mockImage, mockImageVariables, mockProduct,
  createImageMutationMock,
  updateProductMutationMock, updateProductMutationErrorMock,
} from '../../../lib/test-utils/mocks';

const successMocks = [
  { ...createImageMutationMock({ productId: mockProduct.id }) },
  { ...updateProductMutationMock },
];
const errorMocks = [
  { ...createImageMutationMock({ productId: mockProduct.id }) },
  { ...updateProductMutationErrorMock },
];
// mock the global fetch API (cloudinary)
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    public_id: mockImage.cloudinary_id,
    original_filename: mockImage.name,
    secure_url: mockImage.image_url,
    delete_token: 'delete tokeeeen',
    eager: [{
      height: mockImage.height,
      width: mockImage.width,
      transformation: mockImage.transformation,
      secure_url: mockImage.large_image_url,
    }]
  }),
});

describe('<UpdateProductForm />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <UpdateProductForm
          product={{
            id: mockProduct.id,
            department: 'bottoms',
            title: 'some top',
            description: 'some description',
            category: 'pants',
            brand: 'some brand',
            online: true,
            user: {
              id: '123441232132',
              name: 'hannah smith'
            },
            image: {
              id: '777777',
              cloudinary_id: 'clouuuuudid',
              name: 'imageimage',
              width: 22,
              height: 44,
              transformation: '',
              image_url: 'some-image',
              large_image_url: 'some-large-image',
            }
          }}
        />
      </MockedProvider>
    );
  });
  afterEach(() => jest.clearAllMocks());
  afterAll(() => {
    wrapper.unmount();
    global.fetch.mockReset();
  });

  it('renders and matches snapshot', async () => {
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it('handles state updating', async () => {
    wrapper.find('#title').simulate('change', { target: {
      value: mockProduct.title, name: 'title'
    }});
    wrapper.find('#department').simulate('change', { target: {
      value: mockProduct.department, name: 'department', type: 'select'
    }});
    wrapper.find('#category').simulate('change', { target: {
      value: mockProduct.category, name: 'category', type: 'select'
    }});
    wrapper.find('#description').simulate('change', { target: {
      value: mockProduct.description, name: 'description'
    }});
    wrapper.find('#brand').simulate('change', { target: {
      value: mockProduct.brand, name: 'brand'
    }});
    wrapper.find('#offline').simulate('change', { target: {
      value: mockProduct.online, name: 'offline', type: 'radio'
    }});
    wrapper.update();
    expect(wrapper.find('UpdateProductForm').instance().state).toMatchObject({
      id: mockProduct.id,
      title: mockProduct.title,
      department: mockProduct.department,
      category: mockProduct.category,
      description: mockProduct.description,
      brand: mockProduct.brand,
      online: mockProduct.online,
      user: {
        id: '123441232132',
        name: 'hannah smith'
      },
      image: {
        id: '777777',
        cloudinary_id: 'clouuuuudid',
        name: 'imageimage',
        width: 22,
        height: 44,
        transformation: '',
        image_url: 'some-image',
        large_image_url: 'some-large-image',
      },
      message: ''
    });
  });

  it('image upload updates image in state', async () => {
    wrapper.find('input[type="file"]').simulate('change', { target: {
      files: [mockImage.image_url], name: 'image', type: 'file'
    }});
    await wait(50);
    wrapper.update();
    expect(wrapper.find('UpdateProductForm').instance().state.image).toMatchObject({
      ...mockImageVariables,
      delete_token: 'delete tokeeeen'
    });
  });

  it('gives success message after product updated', async () => {
    expect(wrapper.find('button').text()).toContain('Update Product');
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('button').text()).toContain('Updating Product');
    await wait(80);
    wrapper.update();
    const state = wrapper.find('UpdateProductForm').instance().state;
    const displayMess = wrapper.find('DisplayMessage');
    expect(displayMess.text()).toBe('Success!Product changes saved.');
    expect(state.message).toBe('Product changes saved.');
  });
});
