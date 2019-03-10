import { Query } from 'react-apollo';
import { StyledCreatePage } from '../components/styles/PageStyles';
import PageTitle from '../components/PageTitle';
import RequireSignin from '../components/RequireSignin';
import NotFound from '../components/NotFound';
import Permissions from '../components/Permissions';
import { ALL_USERS_QUERY } from '../graphql';


const PermissionsPage = () => (
  <StyledCreatePage>
    <PageTitle page='Manage Permissions' />

    <div className="create-pg-form">
      <RequireSignin>
        {({ me }) => (
          <Query query={ALL_USERS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return (<p>Loading...</p>);
              if (error) return (<NotFound status={401} message={error.message} />);
              const users = (!!data && data.users)
                ? data.users
                : [];
              return (
                <Permissions users={users} />
              );
            }}
          </Query>
        )}
       </RequireSignin>
    </div>
  </StyledCreatePage>
);


export default PermissionsPage;
