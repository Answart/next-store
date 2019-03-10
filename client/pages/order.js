import PropTypes from 'prop-types';
import { StyledOrderPage } from '../components/styles/PageStyles';
import PageTitle from '../components/PageTitle';


const OrderPage = props => (
  <StyledOrderPage>
    <PageTitle page={`Order ${props.query.id}`} />

    <div className='order-page-content'>
      TODO
    </div>
  </StyledOrderPage>
);

OrderPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};


export default OrderPage;
