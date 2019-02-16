import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { userQueryCartItemMock, userQueryEmptyCartMock, removeFromCartMutationMock } from '../../../lib/testMocks';
import { RemoveFromCart } from '../../../components/Buttons';
import { CURRENT_USER_QUERY } from '../../../graphql';

const mocks = [
  { ...userQueryCartItemMock },
  { ...userQueryEmptyCartMock },
  { ...removeFromCartMutationMock }
];

describe('<RemoveFromCart />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RemoveFromCart id="c4rt1t3m1d" />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
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
    const res = await apolloClient.query({ query: CURRENT_USER_QUERY });
    const { me } = res.data;
    expect(me.cart).toHaveLength(1);
    expect(me.cart[0].variant.price).toBe(35);
    wrapper.find('button').simulate('click');
    await wait();
    const res2 = await apolloClient.query({ query: CURRENT_USER_QUERY });
    const me2 = res2.data.me;
    expect(me2.cart).toHaveLength(0);
  });

  it("changes from 'Remove' to 'Removing' when clicked", async () => {
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
    await wait();
    wrapper.update();
    const res = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(wrapper.text()).toContain('Remove');
    wrapper.find('button').simulate('click');
    expect(wrapper.text()).toContain('Removing');
  });
});
