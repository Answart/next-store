import { StyledSignupPage } from '../components/styles/PageStyles';
import PageTitle from '../components/PageTitle';
import { SignupForm, LoginForm } from '../components/Forms';


const SignupPage = props => (
  <StyledSignupPage>
    <PageTitle page='Signup' />

    <div className="signup-page-content">
      <SignupForm />
      <LoginForm />
    </div>
  </StyledSignupPage>
);


export default SignupPage;
