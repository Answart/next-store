import styled, { keyframes } from 'styled-components';


const glow = keyframes`
  from {
    box-shadow: 0 0 0px white;
  }

  to {
    box-shadow: 0 0 10px 1px white;
  }
`;

const SearchStyles = styled.div`
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
`;

const Search = () => (
  <SearchStyles>
    <input
      type='search'
      placeholder='Search'
      id='search'
    />
  </SearchStyles>
);

export default Search;
