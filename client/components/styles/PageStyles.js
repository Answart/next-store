import styled from 'styled-components';


const StyledShopPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 5rem minmax(50rem, 1fr);
  grid-template-columns: 18rem 1fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  .shop-pg-filters {
    grid-column: 1 / 1;
    grid-row: 2 / -1;
  }
  .shop-pg-pgntn {
    grid-column: 2 / -1;
    grid-row: 2 / 2;
  }
  .shop-pg-lst {
    grid-column: 2 / -1;
    grid-row: 3 / -1;
  }
`;

const StyledCreatePage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(36rem, 1fr);
  grid-template-columns: 1fr minmax(50rem, 1fr) 1fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .create-pg-form {
    grid-row: 2 / 2;
    grid-column: 2 / 2;
  }
`;

const StyledEditPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 2rem minmax(50rem, 1fr);
  grid-template-columns: 1fr minmax(50rem, 1fr) 1fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .edit-pg-navi {
    grid-column: 1 / -1;
    grid-row: 2 / 2;
    text-align: right;
    background-color: pink;
  }
  .edit-pg-content {
    grid-column: 2 / 2;
    grid-row: 3 / -1;
  }
`;

const StyledBuyPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-template-columns: 1fr 80% 1fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .buy-page-content {
    grid-row: 2 / 2;
    grid-column: 2 / 2;
    background-color: ${props => props.theme.beige};
    box-shadow: ${props => props.theme.bs};
  }
`;

const StyledSignupPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-template-columns: 1fr 80% 1fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .signup-page-content {
    grid-row: 2 / 2;
    grid-column: 2 / 2;
  }
`;

const StyledPageTitle = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  font-size: 1.1rem;
  color: ${props => props.theme.textGrey};
`;

export {
  StyledShopPage,
  StyledCreatePage,
  StyledEditPage,
  StyledBuyPage,
  StyledSignupPage,
  StyledPageTitle
};
