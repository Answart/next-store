import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { requestPasswordResetMutationMock, requestPasswordResetMutationErrorMock } from '../../../lib/test-utils/mocks';
import { RequestPasswordReset } from '../../../components/Buttons';

const mocks = [
  { ...requestPasswordResetMutationMock },
  { ...requestPasswordResetMutationErrorMock },
];


describe('<RequestPasswordReset />', () => {
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestPasswordReset email='answart@sbcglobal.net'>
          Reset Password?
        </RequestPasswordReset>
      </MockedProvider>
    );
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('calls the mutation when given a known email', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestPasswordReset email='answart@sbcglobal.net'>
          Reset Password?
        </RequestPasswordReset>
      </MockedProvider>
    );
    wrapper.find('button').simulate('click');
    await wait(50);
    wrapper.update();
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith('Your request has been sent! Check your email.');
    wrapper.unmount();
  });

  it('halts mutation when given an unknown email', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestPasswordReset email='err@g.c'>
          Reset Password?
        </RequestPasswordReset>
      </MockedProvider>
    );
    wrapper.find('button').simulate('click');
    await wait(50);
    wrapper.update();
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith('No such user found for email err@g.c');
    wrapper.unmount();
  });

  it('is not called if not given an email', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestPasswordReset email=''>
          Reset Password?
        </RequestPasswordReset>
      </MockedProvider>
    );
    wrapper.find('button').simulate('click');
    await wait();
    wrapper.update();
    expect(window.alert).not.toBeCalled();
    wrapper.unmount();
  });
});