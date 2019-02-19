import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import { CreateProductForm } from '../../../components/Forms';
import {
  mockImage, mockProduct, mockImageVariables,
  createImageMutationMock,
  createProductMutationMock, createProductMutationErrorMock,
} from '../../../lib/test-utils/mocks';

const successMocks = [
  createImageMutationMock(),
  { ...createProductMutationMock },
];
const errorMocks = [
  createImageMutationMock(),
  { ...createProductMutationErrorMock },
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


describe('<CreateProductForm />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <CreateProductForm />
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
    wrapper.find('#title')
      .simulate('change', {
        target: {
          value: mockProduct.title, name: 'title'
        }
      });
    wrapper.update();
    wrapper.find('#department')
      .simulate('change', {
        target: {
          value: mockProduct.department, name: 'department', type: 'select'
        }
      });
    wrapper.update();
    wrapper.find('#category')
      .simulate('change', {
        target: {
          value: mockProduct.category, name: 'category', type: 'select'
        }
      });
    wrapper.update();
    wrapper.find('#description')
      .simulate('change', {
        target: {
          value: mockProduct.description, name: 'description'
        }
      });
    wrapper.update();
    wrapper.find('#brand')
      .simulate('change', {
        target: {
          value: mockProduct.brand, name: 'brand'
        }
      });
    wrapper.update();
    wrapper.find('#offline')
      .simulate('change', {
        target: {
          value: mockProduct.online, name: 'offline', type: 'radio'
        }
      });
    wrapper.update();
    expect(wrapper.find('CreateProductForm').instance().state).toMatchObject({
      title: mockProduct.title,
      department: mockProduct.department,
      category: mockProduct.category,
      description: mockProduct.description,
      brand: mockProduct.brand,
      online: mockProduct.online,
    });
  });


  it('image upload updates image in state', async () => {
    wrapper.find('input[type="file"]')
      .simulate('change', {
        target: {
          files: [mockImage.image_url], name: 'image', type: 'file'
        }
      });
    await wait(50);
    wrapper.update();
    expect(wrapper.find('CreateProductForm').instance().state.image).toMatchObject({
      ...mockImageVariables,
      delete_token: 'delete tokeeeen'
    });
  });

  it('routes to product/selections after successful product creation', async () => {
    Router.router = { push: jest.fn() };
    wrapper.find('form').simulate('submit');
    await wait(50);
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({ pathname: '/product/selections', query: { id: mockProduct.id } });
  });

  // it('renders DisplayMessage component w/error message when submitted with invalid/insufficient info', async () => {
  //   console.error = jest.fn();
  //   const wrapper2 = mount(
  //     <MockedProvider addTypename={false} mocks={errorMocks}>
  //       <CreateProductForm />
  //     </MockedProvider>
  //   );
  //   wrapper2.find('input[type="file"]')
  //     .simulate('change', { target: {
  //       files: [mockImage.image_url], name: 'image', type: 'file'
  //     }});
  //   await wait(50);
  //   expect(global.fetch).toHaveBeenCalled();
  //   Router.router = { push: jest.fn() };
  //   wrapper2.find('form').simulate('submit');
  //   await wait(50);
  //   wrapper2.update();
  //   expect(wrapper2.find('DisplayMessage').text()).toContain('Hold up! ack!');
  //   expect(Router.router.push).not.toHaveBeenCalled();
  //   wrapper2.unmount();
  // });
});
