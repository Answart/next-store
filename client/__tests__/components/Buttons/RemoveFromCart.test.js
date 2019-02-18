import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import {
  userQueryCartItemMock, userQueryEmptyCartMock,
  removeFromCartMutationMock,
} from '../../../lib/test-utils/mocks';
import { RemoveFromCart } from '../../../components/Buttons';
import { CURRENT_USER_QUERY } from '../../../graphql';

const mocks = [
  userQueryCartItemMock(),
  { ...userQueryEmptyCartMock },
  { ...removeFromCartMutationMock }
];


describe('<RemoveFromCart />', () => {
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RemoveFromCart id="c4rt1t3m1d" />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('removes the cartItem from cart', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <RemoveFromCart id='c4rt1t3m1d' />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    const { data: { me: { cart } } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart).toHaveLength(1);
    expect(cart[0].variant.price).toBe(35);
    wrapper.find('button').simulate('click');
    await wait(50);
    const { data: { me: { cart: cart2 } } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart2).toHaveLength(0);
    wrapper.unmount();
  });

  it("changes from 'Remove' to 'Removing' when clicked", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RemoveFromCart id='c4rt1t3m1d' />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain('Remove');
    wrapper.find('button').simulate('click');
    expect(wrapper.text()).toContain('Removing');
    wrapper.unmount();
  });
});
