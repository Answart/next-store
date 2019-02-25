import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import { UpdateProductVariantForm } from '../../../components/Forms';
import {
  mockImage, mockImageVariables, mockProduct, mockVariant,
  createImageMutationMock,
  updateProductVariantMutationMock, updateProductVariantMutationErrorMock,
} from '../../../lib/test-utils/mocks';

const successMocks = [
  { ...createImageMutationMock({ productId: mockProduct.id }) },
  { ...updateProductVariantMutationMock },
];
const errorMocks = [
  { ...createImageMutationMock({ productId: mockProduct.id }) },
  { ...updateProductVariantMutationErrorMock },
];


describe('<UpdateProductVariantForm />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <UpdateProductVariantForm
          goBack={jest.fn()}
          variant={{
            id: mockVariant.id,
            price: 1,
            quantity: 1,
            size: 'L',
            color: 'green',
            sale: true,
            salePrice: 1,
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
            product: {
              ...mockProduct,
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
    wrapper.find('#price').simulate('change', { target: {
      value: mockVariant.price, name: 'price', type: 'number',
    }});
    wrapper.find('#quantity').simulate('change', { target: {
      value: mockVariant.quantity, name: 'quantity', type: 'number',
    }});
    wrapper.find('#size').simulate('change', { target: {
      value: mockVariant.size, name: 'size', type: 'select',
    }});
    wrapper.find('#color').simulate('change', { target: {
      value: mockVariant.color, name: 'color', type: 'select',
    }});
    wrapper.find('#sale').simulate('change', { target: {
      value: mockVariant.sale, name: 'sale', type: 'radio',
    }});
    wrapper.find('#salePrice').simulate('change', { target: {
      value: mockVariant.salePrice, name: 'salePrice', type: 'number',
    }});
    wrapper.update();
    expect(wrapper.find('UpdateProductVariantForm').instance().state).toMatchObject({
      price: mockVariant.price,
      quantity: mockVariant.quantity,
      size: mockVariant.size,
      color: mockVariant.color,
      sale: mockVariant.sale,
      salePrice: mockVariant.salePrice,
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
      product: {
        ...mockProduct,
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
      },
      imageIsNew: false,
      message: '',
    });
  });

  it('newImage inputs productImage radio button works', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => ({
        success: true,
        message: 'Image deleted.',
      }),
    });
    wrapper.find('#newImage').simulate('change', { target: {
      value: 'true', name: 'newImage', type: 'radio', checked: true,
    }});
    await wait(0);
    wrapper.update();
    global.fetch.mockReset();
  });

  it('image upload updates image in state', async () => {
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
        }],
      }),
    });
    wrapper.find('input[type="file"]').simulate('change', { target: {
      files: [mockImage.image_url], name: 'upload', type: 'file',
    }});
    await wait(50);
    wrapper.update();
    const state = wrapper.find('UpdateProductVariantForm').instance().state;
    expect(state.imageIsNew).toBe(true);
    expect(state.image).toMatchObject({
      ...mockImageVariables,
      delete_token: 'delete tokeeeen',
    });
    global.fetch.mockReset();
  });

  it('button text changes to Updating Selection on submit', async () => {
    expect(wrapper.find('button[type="submit"]').text()).toContain('Update Selection');
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('button[type="submit"]').text()).toContain('Updating Selection');
    await wait(80);
    wrapper.update();
    expect(wrapper.find('button[type="submit"]').text()).toContain('Update Selection');
  });

  it('gives success message after product updated', async () => {
    expect(wrapper.find('DisplayMessage').text()).toBe(`Success!Changes for selection with size '${mockVariant.size}' and color '${mockVariant.color}' saved.`);
    expect(wrapper.find('UpdateProductVariantForm').instance().state.message).toBe(`Changes for selection with size '${mockVariant.size}' and color '${mockVariant.color}' saved.`);
  });
});
