import styled from 'styled-components';
import Signup from '../components/Signup';
import Login from '../components/Login';


const StyledSignupPage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <StyledSignupPage>
    <Signup />
    <Login />
  </StyledSignupPage>
);

export default SignupPage;
