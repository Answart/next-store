import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import Permissions from '../../components/Permissions';
import { mockUsers } from '../../lib/test-utils/mocks';


describe('<Permissions />', () => {
  let wrapper, rows, firstRow, secondRow;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <Permissions users={mockUsers} />
      </MockedProvider>
    );
    rows = wrapper.find('UserPermissions');
    firstRow = rows.at(0);
    secondRow = rows.at(1);
  });
  afterAll(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('matches with snapshot', async () => {
    wrapper.update();
    expect(toJSON(wrapper.find('Header'))).toMatchSnapshot();
  });

  it('renders all components properly', async () => {
    expect(wrapper.find('thead').length).toBe(1);
    expect(wrapper.find('thead').find('th').length).toBe(9);
    expect(wrapper.find('tbody').length).toBe(1);
    expect(wrapper.find('tbody').find('tr').length).toBe(2);
    expect(rows.length).toBe(2);
    expect(firstRow.find('tr').length).toBe(1);
    expect(firstRow.find('td').length).toBe(9);
    expect(firstRow.find('input').length).toBe(6);
    expect(firstRow.find('UpdatePermissions').length).toBe(1);
    expect(secondRow.find('tr').length).toBe(1);
    expect(secondRow.find('td').length).toBe(9);
    expect(secondRow.find('input').length).toBe(6);
    expect(secondRow.find('UpdatePermissions').length).toBe(1);
  });


  it('renders user rows properly', async () => {
    const firstMockUserInputAdmin = firstRow.find('input').at(0);
    const firstMockUserInputUser = firstRow.find('input').at(1);
    expect(firstMockUserInputAdmin.length).toBe(1);
    expect(firstMockUserInputAdmin.props().value).toBe('ADMIN');
    expect(firstMockUserInputAdmin.props().checked).toBe(true);
    expect(firstMockUserInputUser.length).toBe(1);
    expect(firstMockUserInputUser.props().value).toBe('USER');
    expect(firstMockUserInputUser.props().checked).toBe(false);
    expect(secondRow.find('tr').length).toBe(1);
    expect(secondRow.find('td').length).toBe(9);
    const secondMockUserInputAdmin = secondRow.find('input').at(0);
    const secondMockUserInputUser = secondRow.find('input').at(1);
    expect(secondMockUserInputAdmin.length).toBe(1);
    expect(secondMockUserInputAdmin.props().value).toBe('ADMIN');
    expect(secondMockUserInputAdmin.props().checked).toBe(false);
    expect(secondMockUserInputUser.length).toBe(1);
    expect(secondMockUserInputUser.props().value).toBe('USER');
    expect(secondMockUserInputUser.props().checked).toBe(true);
  });

  it('clicking a permission input calls handlePermissionChange properly', async () => {
    const firstRowAdminInput = firstRow.find('input').at(0);
    expect(firstRowAdminInput.length).toBe(1);
    expect(firstRowAdminInput.props().value).toBe('ADMIN');
    expect(firstRowAdminInput.props().checked).toBe(true);
    firstRowAdminInput.simulate('change', {target: {checked: false, value: 'ADMIN'}});
    await wait();
    wrapper.update();
    wrapper.find('UserPermissions').at(0).instance().forceUpdate();
    wrapper.update();
    const updatedInput = wrapper.find('UserPermissions').at(0).find('input').at(0);
    expect(updatedInput.props().value).toBe('ADMIN');
    expect(updatedInput.props().checked).toBe(false);
    updatedInput.simulate('change', {target: {checked: true, value: 'ADMIN'}});
    await wait();
    wrapper.update();
    wrapper.find('UserPermissions').at(0).instance().forceUpdate();
    wrapper.update();
    const updatedInput2 = wrapper.find('UserPermissions').at(0).find('input').at(0);
    expect(updatedInput2.props().value).toBe('ADMIN');
    expect(updatedInput2.props().checked).toBe(true);
  });
});
