import Link from 'next/link';
import styled from 'styled-components';


const SigninStyles = styled.span`
  text-alight: right;
  padding: 0px 5px;
`;

const Signin = () => (
  <SigninStyles>
    <Link href="/account">
      <a>Sign In</a>
    </Link>
  </SigninStyles>
);

export default Signin;
