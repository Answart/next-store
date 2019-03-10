import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { mockUser, updatePermissionsMutationMock } from '../../../lib/test-utils/mocks';
import { UpdatePermissions } from '../../../components/Buttons';

const mocks = [
  { ...updatePermissionsMutationMock }
];


describe('<UpdatePermissions />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={mocks}>
        <UpdatePermissions
          permissions={['ADMIN']}
          userId={mockUser.id}
        />
      </MockedProvider>
    );
  });
  afterAll(() => wrapper.unmount());

<<<<<<< HEAD
  // it('renders and matches snapshot', async () => {
  //   expect(toJSON(wrapper.find('UpdatePermissions'))).toMatchSnapshot();
  // });
=======
  it('renders and matches snapshot', async () => {
    expect(toJSON(wrapper.find('UpdatePermissions'))).toMatchSnapshot();
  });
>>>>>>> 63d8cef... Add UpdatePermissions.test to __tests__/components/buttons

  it('click renders properly', async () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').text()).toContain('Updating');
    await wait(80);
    wrapper.update();
    expect(wrapper.find('button').text()).toContain('Update');
  });
});
