import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import User from '../../components/User';
import NotFound from '../../components/NotFound';
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


describe('<User />', () => {
  afterAll(() => wrapper.unmount());

  it('renders with proper data when it returns successfully', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={successMocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (
              <User>
                {({ data, error, loading }) => {
                  if (loading) return (<p>Loading...</p>);
                  if (error) return (<NotFound status={400} message={error.message} />);
                  const { me } = data;
                  if (typeof me === 'undefined' || me === null) return (<NotFound status={404} />);
                  return (<p>something goes here</p>)
                }}
              </User>
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
    expect(wrapper.find('NotFound').length).toBe(0);
    expect(wrapper.text()).toContain('something goes here');
    wrapper.unmount();
  });

  it('renders with proper data when it returns with no user', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={errorMocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (
              <User>
                {({ data, error, loading }) => {
                  if (loading) return (<p>Loading...</p>);
                  if (error) return (<NotFound status={400} message={error.message} />);
                  const { me } = data;
                  if (typeof me === 'undefined' || me === null) return (<NotFound status={404} />);
                  return (<p>something goes here</p>)
                }}
              </User>
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
    expect(wrapper.text()).not.toContain('something goes here');
    const notFound = wrapper.find('NotFound');
    expect(notFound.length).toBe(1);
    expect(notFound.props().status).toBe(404);
    expect(notFound.props().message).toBe('Unable to find what you are looking for!');
    expect(notFound.text()).toBe('Not FoundUnable to find what you are looking for!Go back tohomepage.');
    wrapper.unmount();
  });
});
