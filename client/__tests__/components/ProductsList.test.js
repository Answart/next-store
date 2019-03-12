import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import ProductsList from '../../components/ProductsList';
import {
  mockUser, mockProducts
} from '../../lib/test-utils/mocks';


describe('<ProductsList />', () => {
  let wrapper;
  const variantAction = jest.fn();
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <ProductsList
          products={mockProducts}
          editView={true}
          userId={mockUser.id}
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
    expect(toJSON(wrapper.find('ProductsList'))).toMatchSnapshot();
  });

  it('renders properly', async () => {
    expect(wrapper.find('PriceTag').length).toBe(1);
    expect(wrapper.find('PriceTag').text()).toBe('$35$30');
    expect(wrapper.find('DeleteProduct').length).toBe(1);
    expect(wrapper.find('DeleteProduct').props().id).toBe('pr0duct1d');
    expect(wrapper.find('DeleteProduct').props().userName).toBe('Miss Coleman Berge');
    expect(wrapper.find('DeleteProduct').text()).toBe('Delete');
    expect(wrapper.find('i.prdct-itm-actns').length).toBe(1);
    expect(wrapper.find('i.prdct-itm-actns').text()).toBe('(Offline)');
  });
});
