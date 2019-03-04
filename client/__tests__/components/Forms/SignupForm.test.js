import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { SignupForm } from '../../../components/Forms';
import {
  mockUser,
  userQueryNoUserMock, userQueryEmptyCartMock,
  signupMutationMock,
} from '../../../lib/test-utils/mocks';
import { CURRENT_USER_QUERY } from '../../../graphql';

const successMocks = [
  { ...userQueryNoUserMock },
  { ...signupMutationMock },
  { ...userQueryEmptyCartMock },
];


describe('<SignupForm />', () => {
  let wrapper, apolloClient;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <SignupForm />;
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
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it('handles state updating', async () => {
    wrapper.find('#signup-name').simulate('change', { target: {
      value: mockUser.name, name: 'name', type: 'text',
    }});
    wrapper.find('#signup-email').simulate('change', { target: {
      value: mockUser.email, name: 'email', type: 'email',
    }});
    wrapper.find('#signup-password').simulate('change', { target: {
      value: mockUser.password, name: 'password', type: 'password',
    }});
    wrapper.update();
    expect(wrapper.find('SignupForm').instance().state).toMatchObject({
      name: mockUser.name,
      email: mockUser.email,
      password: mockUser.password,
    });
  });

  it('sets current active user', async () => {
    Router.router = { push: jest.fn() };
    const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me).toBe(null);
    wrapper.find('form').simulate('submit');
    await wait(50);
    wrapper.update();
    const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me2.name).toBe(mockUser.name);
    expect(me2.email).toBe(mockUser.email);
  });

  it('routes to /shop after successful user signup', async () => {
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/shop',
      query: { name: mockUser.name },
    });
    jest.clearAllMocks();
  });

  it('resets state after submit', async () => {
    expect(wrapper.find('SignupForm').instance().state).toMatchObject({
      name: '', email: '', password: '',
    });
  });
});
