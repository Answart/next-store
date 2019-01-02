import PropTypes from 'prop-types';
import { StyledPermissionsTable } from './styles/TableStyles';
import { permissions } from '../config';


const Permissions = ({ users }) => (
  <StyledPermissionsTable>
    <thead>
      <tr>
        <th>Name</th>

        <th>Email</th>

        {permissions.map(permission => (
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
