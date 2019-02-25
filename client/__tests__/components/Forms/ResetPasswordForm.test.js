import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import { mockUser, userQueryEmptyCartMock, resetPasswordMutationMock, resetPasswordMutationErrorMock } from '../../../lib/test-utils/mocks';
import { ResetPasswordForm } from '../../../components/Forms';

const successMocks = [
  { ...resetPasswordMutationMock },
  { ...userQueryEmptyCartMock },
];
const errorMocks = [
  { ...resetPasswordMutationErrorMock },
  { ...userQueryEmptyCartMock },
];


describe('<ResetPasswordForm />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <ResetPasswordForm resetToken='test-token' />
      </MockedProvider>
    );
    Router.router = { push: jest.fn() };
  });
  afterAll(() => {
    wrapper.unmount();
    jest.clearAllMocks()
  });

  it('renders and matches snapshot', async () => {
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it('handles state updating', async () => {
    wrapper.find('#password').simulate('change', { target: {
      value: mockUser.password, name: 'password',
    }});
    wrapper.find('#confirmPassword').simulate('change', { target: {
      value: mockUser.password, name: 'confirmPassword',
    }});
    wrapper.update();
    expect(wrapper.find('ResetPasswordForm').instance().state).toMatchObject({
      password: mockUser.password,
      confirmPassword: mockUser.password,
    });
  });

  describe('valid form', async () => {
    beforeAll(() => {
      expect(wrapper.find('button').text()).toContain('Reset Password');
      wrapper.find('form').simulate('submit');
    });

    it('button text changes to Resetting Password on submit', async () => {
      expect(wrapper.find('button').text()).toContain('Resetting Password');
      await wait(50);
      wrapper.update();
      expect(wrapper.find('button').text()).toContain('Reset Password');
    });

    it('routes to current users shop page after submit', async () => {
      expect(Router.router.push).toHaveBeenCalled();
      expect(Router.router.push).toHaveBeenCalledWith({
        pathname: '/shop',
        query: { name: mockUser.name },
      });
    });

    it('state password/confirmPassword are reset after submit', async () => {
      expect(wrapper.find('ResetPasswordForm').instance().state).toMatchObject({
        password: '',
        confirmPassword: '',
      });
    });
  })

  describe('invalid form', async () => {
    let wrapper2;
    beforeAll(() => {
      wrapper2 = mount(
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <ResetPasswordForm resetToken='test-token' />
        </MockedProvider>
      );
      Router.router = { push: jest.fn() };
      wrapper2.find('#password').simulate('change', { target: {
        value: mockUser.password, name: 'password',
      }});
      wrapper2.find('#confirmPassword').simulate('change', { target: {
        value: 'wrong-password', name: 'confirmPassword',
      }});
      wrapper2.update();
    });
    afterAll(() => {
      wrapper2.unmount();
      jest.clearAllMocks();
    });

    it('show DisplayMessage component with error message', async () => {
      wrapper2.find('form').simulate('submit');
      await wait(50);
      wrapper2.update();
      expect(wrapper2.find('DisplayMessage').text()).toContain('Hold up! ack!');
    });

    it('does NOT route to current users shop page after submit', async () => {
      expect(Router.router.push).not.toHaveBeenCalled();
    });

    it('state password/confirmPassword are NOT reset after submit', async () => {
      expect(wrapper2.find('ResetPasswordForm').instance().state).toMatchObject({
        password: mockUser.password,
        confirmPassword: 'wrong-password',
      });
    });
  })
});
