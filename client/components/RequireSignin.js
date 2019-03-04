import { Query } from 'react-apollo';
import { SigninForm } from './Forms';
import NotFound from './NotFound';
import User from './User';


const RequireSignin = (props) => (
  <User>
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading...</p>);
      if (error) return (<NotFound status={401} message={error.message} />);
      if (!data || !data.me) {
        return (
          <div>
            <p>
              Please Sign In before Continuing
            </p>

            <SigninForm />
          </div>
        );
      }
      return props.children;
    }}
  </User>
);


export default RequireSignin;
