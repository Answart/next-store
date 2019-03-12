import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import RequireSignin from '../components/RequireSignin';
import { StyledOrderPage } from '../components/styles/PageStyles';


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
          <p>TODO</p>
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
