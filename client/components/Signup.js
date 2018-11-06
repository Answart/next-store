import Link from 'next/link';
import styled from 'styled-components';


const SignupStyles = styled.span`
  text-alight: right;
  padding: 0px 5px;
`;

const Signup = () => (
  <SignupStyles>
    <Link href="/signup">
      <a>Join</a>
    </Link>
  </SignupStyles>
);

export default Signup;
