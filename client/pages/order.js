import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import PageTitle from '../components/PageTitle';
import NotFound from '../components/NotFound';
import RequireSignin from '../components/RequireSignin';
import { StyledOrderPage } from '../components/styles/PageStyles';
import { ORDER_QUERY } from '../graphql';


const OrderPage = props => (
  <StyledOrderPage>
    <PageTitle
      page={`Order '${props.query.id}'`}
      titles={[{
        label: 'Orders',
        href: { pathname: '/orders' }
      }, {
        label: `Order '${props.query.id}'`
      }]}
    />

    <div className='order-page-content'>
      <RequireSignin>
        {({ me }) => (
          <Query query={ORDER_QUERY} variables={{ id: props.query.id }}>
            {({ data, error, loading }) => {
              if (loading) return (<p>Loading...</p>);
              if (error) return (<NotFound status={400} message={error.message} />);
              const { order } = data;
              if (!order) return (<NotFound status={404} message='This order does not exist.' />);
              return (
                <p>TODO</p>
              );
            }}
          </Query>
        )}
      </RequireSignin>
    </div>
  </StyledOrderPage>
);

OrderPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};


export default OrderPage;
