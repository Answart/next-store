import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { userQueryEmptyCartMock, userQueryCartItemMock, addToCartMutationMock } from '../../../lib/testMocks';
import { AddToCart } from '../../../components/Buttons';
import { CURRENT_USER_QUERY } from '../../../graphql';
import { fakeVariant } from '../../../lib/testUtils';

const mocks = [
  { ...userQueryEmptyCartMock },
  { ...addToCartMutationMock },
  userQueryCartItemMock({ quantity: 1 }),
];

describe('<AddToCart />', () => {
  it('renders and matches the snap shot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart variant={fakeVariant()} disabled={false} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
  });

  it('adds an item to cart when clicked', async () => {
    let apolloClient;
    const variant = fakeVariant();
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <AddToCart variant={variant} disabled={false} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me.cart).toHaveLength(0);
    wrapper.find('button').simulate('click');
    await wait();
    const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me2.cart).toHaveLength(1);
    expect(me2.cart[0].id).toBe('c4rt1t3m1d');
    expect(me2.cart[0].quantity).toBe(3);
  });

  it("changes from 'Add To Cart' to 'Adding To Cart' when clicked", async () => {
    const variant = fakeVariant();
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart variant={variant} disabled={false} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain('Add To Cart');
    wrapper.find('button').simulate('click');
    expect(wrapper.text()).toContain('Adding To Cart');
  });

  it('does not add an item to cart when disabled', async () => {
    const variant = fakeVariant();
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <AddToCart variant={variant} disabled={true} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me.cart).toHaveLength(0);
    wrapper.find('button').simulate('click');
    await wait();
    expect(wrapper.text()).toContain('Add To Cart');
    const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me2.cart).toHaveLength(0);
  });
});