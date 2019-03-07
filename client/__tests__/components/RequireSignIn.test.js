import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import RequireSignin from '../../components/RequireSignin';
import {
  mockUser,
  userQueryEmptyCartMock, userQueryNoUserMock,
  localUserQueryEmptyCartMock, localUserQueryNoUserMock,
} from '../../lib/test-utils/mocks';
import { LOCAL_USER_QUERY, CURRENT_USER_QUERY } from '../../graphql';

const successMocks = [
  { ...userQueryEmptyCartMock },
  { ...localUserQueryEmptyCartMock }
];
const errorMocks = [
  { ...userQueryNoUserMock },
  { ...localUserQueryNoUserMock }
];
const sanitizedMockUser = mockUser;
delete sanitizedMockUser.permissions;
delete sanitizedMockUser.password;


describe('<RequireSignin />', () => {
  afterAll(() => wrapper.unmount());

  it('renders with proper data when it returns successfully', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={successMocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (
              <RequireSignin>
                <p>We rendered!</p>
              </RequireSignin>
            );
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    expect(wrapper.text()).toContain('Loading...');
    const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me2).toMatchObject(sanitizedMockUser);
    const { data: { me } } = await apolloClient.query({ query: LOCAL_USER_QUERY });
    expect(me).toMatchObject(sanitizedMockUser);
    wrapper.update();
    expect(wrapper.text()).toContain('We rendered!');
    expect(wrapper.text()).not.toContain('Please Sign In before ContinuingSign into your accountEmailPasswordReset password?Sign In!');
    expect(wrapper.find('SigninForm').length).toBe(0);
    wrapper.unmount();
  });

  it('renders with proper data when it returns with no signed in user', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={errorMocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (
              <RequireSignin>
                <p>We rendered!</p>
              </RequireSignin>
            );
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    expect(wrapper.text()).toContain('Loading...');
    const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me2).toBe(null);
    const { data: { me } } = await apolloClient.query({ query: LOCAL_USER_QUERY });
    expect(me).toBe(null);
    wrapper.update();
    expect(wrapper.text()).toContain('Please Sign In before ContinuingSign into your accountEmailPasswordReset password?Sign In!');
    expect(wrapper.find('SigninForm').length).toBe(1);
    wrapper.unmount();
  });
});
