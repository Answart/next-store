import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav.js';
import Search from './Search.js';


const StyledHeader = styled.header`
  top: 0;
  left: 0;
  background-color: ${props => props.theme.beige};
  a {
    color: ${props => props.theme.textGrey};
  }
  a:hover {
    color: ${props => props.theme.darkblue};
  }
  .hdr-banner {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    justify-content: center;
    padding: 1rem 11rem;
  }
  .hdr-logo {
    display: grid;
    place-items: center center;
    font-family: 'guttenbg';
    a {
      font-size: 4rem !important;
      font-weight: normal;
      color: ${props => props.theme.darkblue};
    }
  }
  .hdr-account {
    display: flex;
    justify-content: flex-end;
    padding-top: 2.45rem;
    color: ${props => props.theme.textGrey};
    a {
      padding-top: 0;
      padding-left: 0.4rem;
      padding-bottom: 0;
      padding-right: 0.4rem;
    }
  }
  .hdr-pad {
    padding-top: 0.23rem !important;
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="hdr-banner">
      <Search />

      <div className="hdr-logo">
        <Link href="/">
          <a>NextStore</a>
        </Link>
      </div>

      <div className="hdr-account">
        {authed ? (
          <>
            <User />
            <Link href="/sell">
              <a>
                <img src="/static/images/box.svg" alt="Sell" height="17" width="17" />
              </a>
            </Link>
            <Link href="/account/sell">
              <a className="hdr-pad">
                <img src="/static/images/package.svg" alt="Sell" height="14" width="14" />
              </a>
            </Link>
            <Link href="/account/cart">
              <a className="hdr-pad">
                <img src="/static/images/cart.svg" alt="Cart" height="13" width="13" />
              </a>
            </Link>
          </>
        ) : (
          <>
            <Link href="/account">
              <a className="hdr-pad">
                Sign In
              </a>
            </Link>
            |
            <Link href="/signup">
              <a className="hdr-pad">
                Join
              </a>
            </Link>
          </>
        )}
      </div>
    </div>

    <Nav />
  </StyledHeader>
)

export default Header;
