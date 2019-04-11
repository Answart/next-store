import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import RequireSignin from '../components/RequireSignin';
import { StyledOrderPage } from '../components/styles/PageStyles';
import { getQueryVariables } from '../lib/utils';


const SalesPage = (props) => (
  <StyledOrderPage>
    <PageTitle page='Sales' />

    <div className='order-page-content'>
      <RequireSignin>
        {({ me }) => {
          const variables = getQueryVariables(query);
          variables.sellerId = me.id;
          return (
            <p>TODO</p>
          )
        }}
      </RequireSignin>
    </div>
  </StyledOrderPage>
);


export default SalesPage;
