import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import { ResetPasswordForm } from '../components/Forms';
import { StyledCreatePage } from '../components/styles/PageStyles';


const ResetPasswordPage = ({ query }) => (
  <StyledCreatePage>
    <PageTitle page='Reset Your Password' />

    <div className="create-page-form">
      <ResetPasswordForm resetToken={query.resetToken} />
    </div>
  </StyledCreatePage>
);

ResetPasswordPage.propTypes = {
  query: PropTypes.shape({
    resetToken: PropTypes.string
  }).isRequired
};


export default ResetPasswordPage;
