import styled from 'styled-components';
import { SignupForm, LoginForm } from '../components/Forms';


const StyledSignupPage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <StyledSignupPage>
    <SignupForm />
    <LoginForm />
  </StyledSignupPage>
);

export default SignupPage;
