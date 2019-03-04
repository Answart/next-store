import PropTypes from 'prop-types';
import { StyledPermissionsTable } from './styles/TableStyles';
import { UpdatePermissions } from './Buttons';
import { PERMISSIONS } from '../config';


class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      permissions: PropTypes.array.isRequired,
    }).isRequired
  };
  state = {
    permissions: [ ...this.props.user.permissions ]
  };
  handlePermissionChange = (e) => {
    const { checked, value } = e.target;
    let updatedPermissions = [ ...this.state.permissions ];

    if (checked) {
      updatedPermissions.push(value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== value);
    }

    this.setState({ permissions: updatedPermissions });
  };
  render() {
    const { user } = this.props;
    return (
      <tr key={`${user.id}-permissions`} id={`${user.id}-permissions`}>
        <td>
          {user.name}
        </td>

        <td>
          {user.email}
        </td>

        {PERMISSIONS.map(permission => (
          <td key={`${user.id}-permission-${permission}`}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={this.state.permissions.includes(permission)}
                value={permission}
                onChange={this.handlePermissionChange}
              />
            </label>
          </td>
        ))}

        <td>
          <UpdatePermissions
            permissions={this.state.permissions}
            userId={this.props.user.id}
          />
        </td>
      </tr>
    );
  }
};

const Permissions = ({ users }) => (
  <StyledPermissionsTable>
    <thead>
      <tr>
        <th>Name</th>

        <th>Email</th>

        {PERMISSIONS.map(permission => (
          <th key={permission}>
            {permission}
          </th>
        ))}

        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {!!users.length && users.map(user => (
        <UserPermissions key={`${user.id}-permissions`} user={user} />
      ))}
    </tbody>
  </StyledPermissionsTable>
);

Permissions.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    permissions: PropTypes.array.isRequired,
  })).isRequired,
};


export default Permissions;
