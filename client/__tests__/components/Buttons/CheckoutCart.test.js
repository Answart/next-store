import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import Router from 'next/router';
import NProgress from 'nprogress';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { mockUser, mockProduct, userQueryCartItemMock } from '../../../lib/test-utils/mocks';
import { CheckoutCart } from '../../../components/Buttons';
import { CURRENT_USER_QUERY } from '../../../graphql';

const mocks = [
  userQueryCartItemMock(),
];
Router.router = { push: jest.fn() };
NProgress.start = jest.fn();
NProgress.done = jest.fn();


describe('<CheckoutCart />', () => {
  let wrapper, apolloClient;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (
              <CheckoutCart
                disabled={true}
                email={mockUser.email}
                totalQuantity={2}
                totalAmount={1200}
                image_url={mockProduct.image.image_url}
              >
                Checkout
              </CheckoutCart>
            );
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it('renders and matches snapshot', async () => {
    expect(toJSON(wrapper.find('CheckoutCart'))).toMatchSnapshot();
  });

  it('creates an order onToken', async () => {
    const createOrderSpy = jest.fn().mockResolvedValue({ data: { createOrder: { id: 'xyz789' } } });
    wrapper.find('CheckoutCart').instance().onToken(null, { id: 'abc123' }, createOrderSpy);
    expect(createOrderSpy).toBeCalled();
    expect(createOrderSpy).toBeCalledWith({ variables: { token: 'abc123' } });
  });

  it('turns the progress bar on', async () => {
    await wait();
    wrapper.update();
    wrapper.find('button').simulate('click');
    expect(NProgress.start).toHaveBeenCalled();
  });

  it('routes to the order page when completed', async () => {
    await wait();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/order',
      query: { id: 'xyz789' },
    });
  });
});
