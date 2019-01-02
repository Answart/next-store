import { StyledSignupPage } from '../components/styles/PageStyles';
import PageTitle from '../components/PageTitle';
import { SignupForm, SigninForm } from '../components/Forms';


const SignupPage = () => (
  <StyledSignupPage>
    <PageTitle page='Signup' />

    <div className="signup-page-content">
      <SignupForm />
      <SigninForm />
    </div>
  </StyledSignupPage>
);


export default SignupPage;
