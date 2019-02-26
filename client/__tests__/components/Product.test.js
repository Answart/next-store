import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import Product from '../../components/Product';
import { mockProduct } from '../../lib/test-utils/mocks';


describe('<Product />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <Product
          product={mockProduct}
          demoView={false}
          variantAction={jest.fn()}
          variantActionLabel='Select'
        />
      </MockedProvider>
    );
  });
  afterAll(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('matches the snap shot', async () => {
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('Product'))).toMatchSnapshot();
  });

  it('renders properly', async () => {
    expect(wrapper.find('.prdct-imgs').length).toBe(1);
    expect(wrapper.find('#prdct-title').length).toBe(1);
    expect(wrapper.find('#prdct-title').length).toBe(1);
    expect(wrapper.find('#prdct-title').find('Link').props().href).toMatchObject({
      pathname: "/buy",
      query: { id: mockProduct.id }
    });
    expect(wrapper.find('#prdct-title').text()).toBe(mockProduct.title);
    expect(wrapper.find('ByCreator').length).toBe(1);
    expect(wrapper.find('ByCreator').text()).toBe(`By${mockProduct.user.name}`);
    expect(wrapper.find('#prdct-online').length).toBe(1);
    expect(wrapper.find('#prdct-online').text()).toBe('Offline');
    expect(wrapper.find('ProductVariants').length).toBe(1);
    expect(wrapper.find('#prdct-description').length).toBe(1);
    expect(wrapper.find('#prdct-description').text()).toBe(`Description:${mockProduct.description}`);
    expect(wrapper.find('#prdct-brand').length).toBe(1);
    expect(wrapper.find('#prdct-brand').text()).toBe(`Brand:${mockProduct.brand}`);
  });
});
