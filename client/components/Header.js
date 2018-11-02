import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav.js';


const StyledHeader = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  transition: top .2s ease-in-out;
  background: ${props => props.theme.beige};
  z-index: 100;
  a {
    padding: 0.25rem 0.5rem;
    color: ${props => props.theme.textGrey};
    text-decoration: none;
  }
`;

const Header = () => (
  <StyledHeader>
    <div>
      <Link href="/search">
        <a>Search</a>
      </Link>
      <Link href="/">
        <a>Next Store</a>
      </Link>
      <Link href="/account">
        <a>Account</a>
      </Link>
      <div>Cart</div>
    </div>

    <Nav />
  </StyledHeader>
)

export default Header;
