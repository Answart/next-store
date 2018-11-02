import Link from 'next/link';
import styled from 'styled-components';


const StyledNav = styled.ul`
  z-index: 1;
  margin-top: 0;
  left: 0;
  margin: .625rem auto 0;
  text-align: center;
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  a {
    padding: 0 2.5rem 0.7rem 2.5rem !important;
    -webkit-font-smoothing: antialiased;
    outline: medium none;
    overflow: hidden;
    transition: all .25s ease;
    border-bottom: 1px solid ${props => props.theme.beige};
  }
  a:hover {
    border-bottom: 1px solid ${props => props.theme.orange};
  }
`;

const Nav = () => (
  <StyledNav>
    <Link href="/tops">
      <a>Tops</a>
    </Link>
    <Link href="/bottoms" >
      <a>Bottoms</a>
    </Link>
    <Link href="/shoes">
      <a>Shoes</a>
    </Link>
    <Link href="/outwear">
      <a>Outwear</a>
    </Link>
    <Link href="/accessories">
      <a>Accessories</a>
    </Link>
    <Link href="/gifts">
      <a>Home & Gifts</a>
    </Link>
    <Link href="/wedding">
      <a>Wedding</a>
    </Link>
  </StyledNav>
);

export default Nav;
