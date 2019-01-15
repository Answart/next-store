import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import DisplayMessage from './DisplayMessage';
import { StyledPermissionsTable } from './styles/TableStyles';
import { PERMISSIONS } from '../config';
import { UPDATE_PERMISSIONS_MUTATION } from '../graphql';


class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };
  state = {
    permissions: this.props.user.permissions
  };
  handlePermissionChange = (e) => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];

    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }

    this.setState({ permissions: updatedPermissions });
  };
  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <td colSpan="8">
                <DisplayMessage error={error} />
              </td>
            )}

            <tr>
              <td>{user.name}</td>

              <td>{user.email}</td>

              {PERMISSIONS.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}

              <td>
                <button className="undrln-btn"
                  type="button"
                  disabled={loading}
                  onClick={updatePermissions}
                >Updat{loading ? 'ing' : 'e'}</button>
              </td>
            </tr>
          </>
        )}
      </Mutation>
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
          <th key={permission}>{permission}</th>
        ))}

        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {!!users.length && users.map(user => (
        <UserPermissions key={user.id}
          user={user}
        />
      ))}
    </tbody>
  </StyledPermissionsTable>
);

Permissions.propTypes = {
  users: PropTypes.array.isRequired
};


export default Permissions;
