import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { SigninForm } from './Forms';
import NotFound from './NotFound';
import User from './User';


const RequireSignin = (props) => (
  <User>
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading...</p>);
      if (error) return (<NotFound status={401} message={error.message} />);
      const me = (!data || !data.me)
        ? null
        : data.me;
      if (!me) {
        return (
          <div>
            <p>
              Please Sign In before Continuing
            </p>

            <SigninForm />
          </div>
        );
      }
      return props.children({ me });
    }}
  </User>
);

RequireSignin.propTypes = {
  children: PropTypes.func.isRequired
};


export default RequireSignin;
