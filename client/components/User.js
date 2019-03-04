import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { LOCAL_USER_QUERY } from '../graphql';


const User = ({ children }) => (
  <Query query={LOCAL_USER_QUERY}>
    {payload => children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};


export default User;
