import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import SalesList from '../../components/SalesList';
import { mockOrderItem } from '../../lib/test-utils/mocks';


describe('<SalesList />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <SalesList orderItems={[mockOrderItem]} pageQuery={{}} />
      </MockedProvider>
    );
  });
  afterAll(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  // it('matches the snap shot', async () => {
  //   await wait();
  //   wrapper.update();
  //   expect(toJSON(wrapper.find('#sales-list'))).toMatchSnapshot();
  // });

  it('renders properly', async () => {
    expect(wrapper.find(`#sales-list-item-${mockOrderItem.id}`).length).toBe(1);
    expect(wrapper.find(`#sales-list-item-${mockOrderItem.id}`).find('Link').props().href).toMatchObject({
      pathname: "/product/edit",
      query: { id: mockOrderItem.variant.product.id }
    });
    expect(wrapper.find('.order-list-item-details').length).toBe(1);
    expect(wrapper.find('.order-list-item-details').find('h3').find('span').length).toBe(2);
    expect(wrapper.find('.order-list-item-details').find('p').length).toBe(7);
  });
});
