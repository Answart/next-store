import styled from 'styled-components';


const StyledSignupPage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <StyledSignupPage>
    Please sign in or sign up here.
  </StyledSignupPage>
);

export default SignupPage;
