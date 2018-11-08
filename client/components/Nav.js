import Link from 'next/link';
import styled from 'styled-components';


const StyledNav = styled.div`
  display: flex;
  justify-content: center;
  a {
    padding: 0 3rem 0.5rem 3rem !important;
    -webkit-font-smoothing: antialiased;
    outline: medium none;
    overflow: hidden;
    border-bottom: 1px solid ${props => props.theme.beige};
  }
  a:hover {
    border-bottom: 1px solid ${props => props.theme.orange};
  }
`;

const Nav = () => (
  <StyledNav>
    <Link href={{
      pathname: `/shop`,
      query: { department: 'tops' }
    }}>
      <a>Tops</a>
    </Link>
    <Link href={{
      pathname: `/shop`,
      query: { department: 'bottoms' }
    }}>
      <a>Bottoms</a>
    </Link>
    <Link href={{
      pathname: `/shop`,
      query: { department: 'shoes' }
    }}>
      <a>Shoes</a>
    </Link>
    <Link href={{
      pathname: `/shop`,
      query: { department: 'outwear' }
    }}>
      <a>Outwear</a>
    </Link>
    <Link href={{
      pathname: `/shop`,
      query: { department: 'accessories' }
    }}>
      <a>Accessories</a>
    </Link>
    <Link href={{
      pathname: `/shop`,
      query: { department: 'decor' }
    }}>
      <a>Decor</a>
    </Link>
    <Link href={{
      pathname: `/shop`,
      query: { department: 'wedding' }
    }}>
      <a>Wedding</a>
    </Link>
  </StyledNav>
);

export default Nav;
