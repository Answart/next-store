import Link from 'next/link';
import styled from 'styled-components';


const SignupStyles = styled.span`
  text-alight: right;
`;

const Signup = () => (
  <SignupStyles>
    <Link href="/signup">
      <a>Join</a>
    </Link>
  </SignupStyles>
);

export default Signup;
