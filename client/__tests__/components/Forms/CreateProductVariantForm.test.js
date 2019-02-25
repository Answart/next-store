import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { CreateProductVariantForm } from '../../../components/Forms';
import {
  mockImage, mockImageVariables, mockProduct, mockVariant, mockUser,
  createImageMutationMock,
  createProductVariantMutationMock, createProductVariantMutationErrorMock,
  productQueryNoVariantMock, productQueryMock,
} from '../../../lib/test-utils/mocks';
import { PRODUCT_QUERY } from '../../../graphql';

const successMocks = [
  { ...productQueryNoVariantMock },
  createImageMutationMock({ productId: mockProduct.id }),
  { ...createProductVariantMutationMock },
  { ...productQueryMock },
];
const errorMocks = [
  createImageMutationMock({ productId: mockProduct.id }),
  { ...createProductVariantMutationErrorMock },
];


describe('<CreateProductVariantForm />', () => {
  let wrapper, apolloClient;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (
              <CreateProductVariantForm
                productId={mockProduct.id}
                productImage={{
                  id: '',
                  cloudinary_id: '',
                  name: '',
                  width: 0,
                  height: 0,
                  transformation: '',
                  image_url: '',
                  large_image_url: '',
                  delete_token: '',
                }}
              />
            );
          }}
      </ApolloConsumer>
      </MockedProvider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks()
  });
  afterAll(() => {
    wrapper.unmount();
    global.fetch.mockReset();
  });

  it('renders and matches snapshot', async () => {
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it('handles state updating', async () => {
    wrapper.find('#size').simulate('change', { target: {
      value: mockVariant.size, name: 'size', type: 'select'
    }});
    wrapper.find('#color').simulate('change', { target: {
      value: mockVariant.color, name: 'color', type: 'select'
    }});
    wrapper.find('#quantity').simulate('change', { target: {
      value: mockVariant.quantity, name: 'quantity', type: 'number'
    }});
    wrapper.find('#price').simulate('change', { target: {
      value: mockVariant.price, name: 'price', type: 'number'
    }});
    wrapper.find('#sale').simulate('change', { target: {
      value: mockVariant.sale, name: 'sale', type: 'checkbox', checked: mockVariant.sale
    }});
    wrapper.find('#salePrice').simulate('change', { target: {
      value: mockVariant.salePrice, name: 'salePrice', type: 'number'
    }});
    wrapper.update();
    expect(wrapper.find('CreateProductVariantForm').instance().state).toMatchObject({
      size: mockVariant.size,
      color: mockVariant.color,
      quantity: mockVariant.quantity,
      price: mockVariant.price,
      sale: mockVariant.sale,
      salePrice: mockVariant.salePrice,
      image: {
        id: '',
        cloudinary_id: '',
        name: '',
        width: 0,
        height: 0,
        transformation: '',
        image_url: '',
        large_image_url: '',
        delete_token: '',
      },
      message: '',
      imageIsNew: false
    });
  });

  it('changing radio button newImage changes state imageIsNew', async () => {
    wrapper.find('#newImage').simulate('change', { target: {
      value: 'true', name: 'newImage', type: 'radio', checked: true
    }});
    await wait(0);
    wrapper.update();
    expect(wrapper.find('CreateProductVariantForm').instance().state.imageIsNew).toBe(true);
  });

  it('image upload updates image in state', async () => {
    console.error = jest.fn();
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
    wrapper.find('input[type="file"]').simulate('change', { target: {
      files: [mockImage.image_url], name: 'upload', type: 'file'
    }});
    await wait(50);
    wrapper.update();
    expect(global.fetch).toHaveBeenCalled();
    const form = wrapper.find('CreateProductVariantForm');
    expect(form.instance().state.image).toMatchObject({
      ...mockImageVariables,
      delete_token: 'delete tokeeeen'
    });
    global.fetch.mockReset();
  });

  it('button text changes to Adding Selection on submit', async () => {
    const { data: { product: { variants } } } = await apolloClient.query({ query: PRODUCT_QUERY, variables: { id: mockProduct.id }});
    expect(variants).toHaveLength(0);
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('button').text()).toContain('Adding Selection');
    await wait(80);
    wrapper.update();
    expect(wrapper.find('button').text()).toContain('Add Selection');
  });

  it('shows success message after successful submit', async () => {
    expect(wrapper.find('DisplayMessage').text()).toContain(`Selection of size '${mockVariant.size}' and color '${mockVariant.color}' added to product!`);
  });

  it('updates product with new variant', async () => {
    const { data: { product: { variants } } } = await apolloClient.query({ query: PRODUCT_QUERY, variables: { id: mockProduct.id }});
    expect(variants).toHaveLength(1);
    expect(variants[0].id).toBe('v4r13nt1d');
    expect(variants[0].quantity).toBe(4);
  });

  it('renders DisplayMessage component w/error message when submit returns an error', async () => {
    console.error = jest.fn();
    const wrapper2 = mount(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <CreateProductVariantForm
          productId={mockProduct.id}
          productImage={{
            ...mockImageVariables,
            delete_token: 'delete tokeeeen',
          }}
        />
      </MockedProvider>
    );
    wrapper2.find('#newImage').simulate('change', { target: {
      value: 'true', name: 'newImage', type: 'radio', checked: true
    }});
    await wait(0);
    wrapper2.update();
    expect(wrapper2.find('CreateProductVariantForm').instance().state.imageIsNew).toBe(true);
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
    wrapper2.find('input[type="file"]').simulate('change', { target: {
      files: [mockImage.image_url], name: 'upload', type: 'file'
    }});
    await wait(50);
    expect(global.fetch).toHaveBeenCalled();
    wrapper2.find('form').simulate('submit');
    await wait(50);
    wrapper2.update();
    expect(wrapper2.find('DisplayMessage').text()).toContain('Hold up! ack!');
    wrapper2.unmount();
  });
});
