import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav.js';
import Search from './Search.js';
import Signin from './Signin.js';
import Signup from './Signup.js';
import User from './User.js';
import Cart from './Cart.js';


const StyledHeader = styled.header`
  top: 0;
  left: 0;
  background-color: ${props => props.theme.beige};
  a {
    color: ${props => props.theme.textGrey};
  }
  .header-banner {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    justify-content: center;
    padding: 1rem 11rem;
  }
  .header-logo {
    display: grid;
    place-items: center center;
    font-family: 'guttenbg';
    a {
      font-size: 4rem !important;
      font-weight: normal;
    }
  }
  .header-account {
    display: grid;
    grid-gap: 2px;
    grid-template-columns: 1fr auto 2rem;
    place-items: center end;
    color: ${props => props.theme.textGrey};
    a {
      padding: 0px 3px;
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="header-banner">
      <Search />

      <div className="header-logo">
        <Link href="/">
          <a>NextStore</a>
        </Link>
      </div>

      <div className="header-account">
        <User />
        <div>
          <Signin />
          <Signup />
        </div>
        <Cart />
      </div>
    </div>

    <Nav />
  </StyledHeader>
)

export default Header;
