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

      <RequireSignin>
        {({ me }) => (
          <Query query={ALL_USERS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return (<p>Loading...</p>);
              if (error) return (
                <div className="create-page-form">
                  <NotFound status={401} message={error.message} />
                </div>
              );
              const users = (!!data && data.users)
                ? data.users
                : [];
              return (
                <div className="create-page-form">
                  <Permissions users={users} />
                </div>
              );
            }}
          </Query>
        )}
       </RequireSignin>
  </StyledCreatePage>
);


export default PermissionsPage;
