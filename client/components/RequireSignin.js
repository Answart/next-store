import { Query } from 'react-apollo';
import { SigninForm } from './Forms';
import { CURRENT_USER_QUERY } from '../graphql';


const RequireSignin = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data || !data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <SigninForm />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);


export default RequireSignin;
