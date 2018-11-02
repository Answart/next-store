import Link from 'next/link';
import styled from 'styled-components';


const SignupStyles = styled.span`
`;

const Signup = () => (
  <SignupStyles>
    <Link href="/signup">
      <a>Sign Up</a>
    </Link>
  </SignupStyles>
);

export default Signup;
