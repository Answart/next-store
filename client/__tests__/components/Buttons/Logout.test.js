import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { userQueryEmptyCartMock, userQueryNoUserMock, signoutMutationMock } from '../../../lib/test-utils/mocks';
import { Logout } from '../../../components/Buttons';
import { CURRENT_USER_QUERY } from '../../../graphql';

const mocks = [
  { ...userQueryEmptyCartMock },
  { ...signoutMutationMock },
  { ...userQueryNoUserMock },
];


describe('<Logout />', () => {
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches the snap shot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Logout />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('removes current active user', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Logout />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    Router.router = { push: jest.fn() };
    const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me.__typename).toBe("User");
    wrapper.find('button').simulate('click');
    await wait(50);
    wrapper.update();
    const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me2).toBe(null);
    wrapper.unmount();
  });

  it('routes to root page after successful logout', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Logout />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    Router.router = { push: jest.fn() };
    wrapper.find('button').simulate('click');
    await wait(50);
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({ pathname: '/' });
    wrapper.unmount();
  });
});