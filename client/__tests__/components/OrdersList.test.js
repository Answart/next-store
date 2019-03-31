import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import OrdersList from '../../components/OrdersList';
import { mockOrder } from '../../lib/test-utils/mocks';


describe('<OrdersList />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <OrdersList orders={[mockOrder]} pageQuery={{}} />
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
    expect(toJSON(wrapper.find('#orders-list'))).toMatchSnapshot();
  });

  it('renders properly', async () => {
    expect(wrapper.find(`#order-list-item-${mockOrder.id}`).length).toBe(1);
    expect(wrapper.find(`#order-list-item-${mockOrder.id}`).find('Link').props().href).toMatchObject({
      pathname: "/order",
      query: { id: mockOrder.id }
    });
    expect(wrapper.find('.order-list-item-details').length).toBe(1);
    expect(wrapper.find('.order-list-item-details').find('h3').find('span').length).toBe(2);
    expect(wrapper.find('.order-list-item-details').find('p').length).toBe(4);
  });
});
