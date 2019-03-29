import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import Order from '../../components/Order';
import { mockOrder } from '../../lib/test-utils/mocks';


describe('<Order />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <Order order={mockOrder} />
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
    expect(toJSON(wrapper.find('form[data-test="order"]'))).toMatchSnapshot();
  });

  it('renders properly', async () => {
    const header = wrapper.find('#order-header')
    expect(header.find('h2').length).toBe(1);
    expect(header.find('h2').find('span').length).toBe(2);
    expect(header.find('.order-payment-details').length).toBe(1);
    expect(header.find('.order-payment-details').find('p').length).toBe(3);
    const table = wrapper.find('table');
    expect(table.length).toBe(1);
    expect(table.find('thead').length).toBe(1);
    expect(table.find('thead').find('th').length).toBe(3);
    expect(table.find('tbody').length).toBe(1);
    expect(table.find('tbody').find('tr').length).toBe(1);
    expect(table.find('tbody').find('td').length).toBe(3);
    expect(table.find('tbody').find('Link').props().href).toMatchObject({
      pathname: "/buy",
      query: { id: mockOrder.items[0].variant.product.id }
    });
    expect(table.find('tfoot').length).toBe(1);
    expect(table.find('tfoot').find('tr').length).toBe(4);
  });
});
