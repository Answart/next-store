import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { UPDATE_PERMISSIONS_MUTATION, CURRENT_USER_QUERY } from '../../graphql';


const UpdatePermissions = ({ permissions, userId }) => (
  <Mutation mutation={UPDATE_PERMISSIONS_MUTATION}
    variables={{ permissions, userId }}
  >
    {(updatePermissions, { loading, error }) => (
      <button className="undrln-btn"
        disabled={loading || error}
        onClick={(e) => {
          e.preventDefault();
          updatePermissions()
            .catch(err => alert(err.message.replace('GraphQL error: ', '')));
        }}
      >
        Updat{loading ? 'ing' : 'e'}
      </button>
    )}
  </Mutation>
);

UpdatePermissions.propTypes = {
  userId: PropTypes.string.isRequired,
  permissions: PropTypes.array.isRequired,
};


export { UpdatePermissions };
