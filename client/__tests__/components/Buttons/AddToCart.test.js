import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import {
  userQueryEmptyCartMock, userQueryCartItemMock,
} from '../../../lib/testMocks';
import {
  mockVariant,
  addToCartMutationMock,
} from '../../../lib/test-utils/mocks';
import { AddToCart } from '../../../components/Buttons';
import { CURRENT_USER_QUERY } from '../../../graphql';

const mocks = [
  { ...userQueryEmptyCartMock },
  { ...addToCartMutationMock },
  userQueryCartItemMock({ quantity: 1 }),
];


describe('<AddToCart />', () => {
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches the snap shot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart variant={mockVariant} disabled={false} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('adds an item to cart when clicked', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <AddToCart variant={mockVariant} disabled={false} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const { data: { me: { cart } } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart).toHaveLength(0);
    wrapper.find('button').simulate('click');
    await wait(50);
    const { data: { me: { cart: cart2 } } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart2).toHaveLength(1);
    expect(cart2[0].id).toBe('c4rt1t3m1d');
    expect(cart2[0].quantity).toBe(1);
    expect(cart2[0].variant.id).toBe('v4r13nt1d');
    expect(cart2[0].variant.quantity).toBe(4);
    wrapper.unmount();
  });

  it("changes from 'Add To Cart' to 'Adding To Cart' when clicked", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart variant={mockVariant} disabled={false} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain('Add To Cart');
    wrapper.find('button').simulate('click');
    expect(wrapper.text()).toContain('Adding To Cart');
    wrapper.unmount();
  });

  it('does not add an item to cart when disabled', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <AddToCart variant={mockVariant} disabled={true} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const { data: { me: { cart } } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart).toHaveLength(0);
    wrapper.find('button').simulate('click');
    await wait();
    expect(wrapper.text()).toContain('Add To Cart');
    const { data: { me: { cart: cart2 } } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart2).toHaveLength(0);
    wrapper.unmount();
  });
});