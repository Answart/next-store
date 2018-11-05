import styled, { keyframes } from 'styled-components';


const SearchStyles = styled.div`
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 20px auto;
  place-items: center start;
  color: ${props => props.theme.textGrey};
  img.search-img {
    padding-top: 0.3rem;
    line-height: 1.7rem;
  }
  input.search-input {
    width: 85%;
    width: calc(100% - 3rem);
    line-height: 2rem;
    border: 0;
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.theme.textBlack};
    background-color: transparent;
  }
  input.search-input:hover {
    border-bottom: 1px solid ${props => props.theme.lightGrey};
  }
  input.search-input:focus {
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
  }
`;

const Search = () => (
  <SearchStyles>
    <img className='search-img' src="/static/images/search.svg" alt="Search" width="18" />
    <input
      className='search-input'
      type='search'
      id='search'
    />
  </SearchStyles>
);

export default Search;
