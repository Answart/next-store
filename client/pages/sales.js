import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import RequireSignin from '../components/RequireSignin';
import NotFound from '../components/NotFound';
import { StyledOrderPage } from '../components/styles/PageStyles';
import { getQueryVariables } from '../lib/utils';
import { ORDER_ITEMS_QUERY } from '../graphql';


const SalesPage = ({ query }) => (
  <StyledOrderPage>
    <PageTitle page='Sales' />

    <div className='order-page-content'>
      <RequireSignin>
        {({ me }) => {
          const variables = getQueryVariables(query);
          variables.sellerId = me.id;
          return (
            <Query query={ORDER_ITEMS_QUERY} variables={variables}>
              {({ data, error, loading }) => {
                if (loading) return (<p>Loading...</p>);
                if (error) return (<NotFound status={400} message={error.message} />);
                const { orderItems } = data;
                if (typeof orderItems === 'undefined' || orderItems === null) return (<NotFound status={404} />);
                if (orderItems.length < 1) return (<NotFound status={204} message='You do not have any sales yet.' />);
                const count = orderItems.length;
                return (
                  <p>TODO</p>
                );
              }}
            </Query>
          )
        }}
      </RequireSignin>
    </div>
  </StyledOrderPage>
);


export default SalesPage;
