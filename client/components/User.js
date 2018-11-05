import Link from 'next/link';
import styled from 'styled-components';


const UserStyles = styled.span`
  text-alight: right;
  min-width: 50px;
`;

const User = () => (
  <UserStyles>
    <Link href="/account">
      <a>Firstname</a>
    </Link>
  </UserStyles>
);

export default User;
