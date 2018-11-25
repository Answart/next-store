import Link from 'next/link';
import styled from 'styled-components';
import departments from '../../lib/departments';


const StyledNav = styled.div`
  display: flex;
  justify-content: center;
  a {
    padding: 0 3rem 0.7rem 3rem !important;
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
    {departments.map(dept => (
      <Link key={dept} href={{
        pathname: `/shop`,
        query: { department: dept.toLowerCase() }
      }}>
        <a>{dept}</a>
      </Link>
    ))}
  </StyledNav>
);


export default Nav;
