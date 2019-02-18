import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { userQueryCartItemMock, updateCartItemMutationMock } from '../../../lib/test-utils/mocks';
import { UpdateCartItem } from '../../../components/Buttons';
import { CURRENT_USER_QUERY } from '../../../graphql';

const mocks = [
  userQueryCartItemMock(),
  userQueryCartItemMock(4),
  updateCartItemMutationMock(4),
];


describe('<UpdateCartItem />', () => {
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <UpdateCartItem id="c4rt1t3m1d" quantity={4} disabled={false}>&#8722;</UpdateCartItem>
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('sets cartItem quantity by given amt', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (<UpdateCartItem id='c4rt1t3m1d' quantity={4} disabled={false}>&#8722;</UpdateCartItem>);
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    const { data: { me: { cart } } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(3);
    wrapper.find('button').simulate('click');
    await wait();
    wrapper.update();
    const { data: { me: { cart: cart2 } } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart2).toHaveLength(1);
    expect(cart2[0].quantity).toBe(4);
    wrapper.unmount();
  });
});
