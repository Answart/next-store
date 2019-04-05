import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import PageTitle from '../components/PageTitle';
import RequireSignin from '../components/RequireSignin';
import NotFound from '../components/NotFound';
import Pagination from '../components/Pagination';
import OrdersList from '../components/OrdersList';
import { StyledOrderPage } from '../components/styles/PageStyles';
import { getQueryVariables } from '../lib/utils';
import { ORDERS_QUERY } from '../graphql';


const OrdersPage = ({ query }) => (
  <StyledOrderPage>
    <PageTitle page='Orders' />

    <div className='order-page-content'>
      <RequireSignin>
        {({ me }) => {
          const variables = getQueryVariables(query);
          return (
            <Query query={ORDERS_QUERY} variables={{
              ...variables,
              buyerId: me.id
            }}>
              {({ data, error, loading }) => {
                if (loading) return (<p>Loading...</p>);
                if (error) return (<NotFound status={400} message={error.message} />);
                const { orders } = data;
                console.log('orders', orders)
                if (typeof orders === 'undefined' || orders === null) return (<NotFound status={404} />);
                const count = orders.length;
                if (orders.length < 1) return (<NotFound status={204} message='You do not have any orders yet.' />);
                return (
                  <>
                    <Pagination
                      pathname='/orders'
                      pageQuery={query}
                      results={orders.length}
                      count={count}
                    />

                    <OrdersList orders={orders} pageQuery={query} />

                    <Pagination
                      pathname='/orders'
                      pageQuery={query}
                      results={orders.length}
                      count={count}
                    />
                  </>
                );
              }}
            </Query>
          )
        }}
      </RequireSignin>
    </div>
  </StyledOrderPage>
);


export default OrdersPage;
