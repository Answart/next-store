import Link from 'next/link';
import styled from 'styled-components';


const UserStyles = styled.span`
`;

const User = () => (
  <UserStyles>
    <Link href="/account">
      <a>Account</a>
    </Link>
  </UserStyles>
);

export default User;
