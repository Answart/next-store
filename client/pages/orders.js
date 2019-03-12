import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import RequireSignin from '../components/RequireSignin';
import { StyledOrderPage } from '../components/styles/PageStyles';


const OrdersPage = props => (
  <StyledOrderPage>
    <PageTitle page='Orders' />

    <div className='order-page-content'>
      <RequireSignin>
        {({ me }) => (
          <p>TODO</p>
        )}
      </RequireSignin>
    </div>
  </StyledOrderPage>
);


export default OrdersPage;
