import Link from 'next/link';
import styled from 'styled-components';


const SigninStyles = styled.span`
`;

const Signin = () => (
  <SigninStyles>
    <Link href="/login">
      <a>Sign In</a>
    </Link>
  </SigninStyles>
);

export default Signin;
