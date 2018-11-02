import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav.js';
import Search from './Search.js';
import Signin from './Signin.js';
import Signup from './Signup.js';
import User from './User.js';
import Cart from './Cart.js';


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

const Logo = styled.div`
  font-family: 'guttenbg';
  text-align: center;
  margin: 0;
  a {
    font-size: 4rem !important;
    font-weight: normal;
  }
`;

const Banner = styled.nav`
  position: static;
  top: 0;
  left: auto;
  width: auto;
  margin: auto 2.875rem;
`;

const Account = styled.ul`
  position: absolute;
  top: 2.5rem;
  right: 2.3rem !important;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 20;
`;

const Header = () => (
  <StyledHeader>
    <Logo>
      <Link href="/">
        <a>NextStore</a>
      </Link>
    </Logo>

    <Banner>
      <Search />

      <Account>
        <Signin />
        |
        <Signup />
        ||
        <User />
        |
        <Cart />
      </Account>

      <Nav />
    </Banner>
  </StyledHeader>
)

export default Header;
