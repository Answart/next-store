import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
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

const Logo = styled.div`
  font-family: 'guttenbg';
  text-align: center;
  margin: 0;
  a {
    font-size: 4rem !important;
    font-weight: normal;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px white;
  }

  to {
    box-shadow: 0 0 10px 1px white;
  }
`;

const Banner = styled.nav`
  position: static;
  top: 0;
  left: auto;
  width: auto;
  margin: auto 2.875rem;
  .search {
    position: absolute;
    top: 1.8rem;
    left: 2.3rem !important;
    height: auto;
    max-height: 36px;
    width: 200px;
    margin: 0;
    color: ${props => props.theme.textGrey};
    z-index: 2;
    input {
      width: 100%;
      padding: 10px;
      font-size: 1rem;
      border: 0;
      border-bottom: 1px solid ${props => props.theme.lightGrey};
      background-color: transparent;
      &.loading {
        animation: ${glow} 0.5s ease-in-out infinite alternate;
      }
    }
  }
  .account {
    position: absolute;
    top: 2.5rem;
    right: 2.3rem !important;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    z-index: 20;
  }
`;

const Header = () => (
  <StyledHeader>
    <Logo>
      <Link href="/">
        <a>NextStore</a>
      </Link>
    </Logo>

    <Banner>
      <div className='search'>
        <input
          type='search'
          placeholder='Search'
          id='search'
        />
      </div>

      <div className="account">
        <Link href="/login">
          <a>Sign In</a>
        </Link>
        |
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
        |
        <Link href="/account">
          <a>Account</a>
        </Link>
        |
        <Link href="/login">
          <a>Cart</a>
        </Link>
      </div>
    </Banner>

    <Nav />
  </StyledHeader>
)

export default Header;
