import styled from 'styled-components';


const StyledShopPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 5rem minmax(50rem, 1fr);
  grid-template-columns: 18rem 1fr;
  grid-gap: 3rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  .shop-pg-filters {
    grid-column: 1 / 1;
    grid-row: 2 / -1;
  }
  .shop-pg-lst {
    grid-column: 2 / -1;
    grid-row: 2 / -1;
    display: grid;
    grid-template-rows: 5rem minmax(50rem, 1fr) 5rem;
    grid-gap: 3rem;
    .shop-pg-pagin {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
`;

const StyledCreatePage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(36rem, 1fr);
  grid-template-columns: minmax(80rem, 4fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .create-pg-form {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
    margin: 0 4rem;
  }
`;

const StyledEditPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 2rem minmax(50rem, 1fr);
  grid-template-columns: minmax(80rem, 4fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .edit-pg-navi {
    grid-column: 1 / -1;
    grid-row: 2 / 2;
    text-align: right;
  }
  .edit-pg-content {
    grid-column: 1 / 1;
    grid-row: 3 / -1;
    margin: 0 4rem;
    .edit-pg-content-footer {
      padding: 5rem 0;
      text-align: center;
    }
  }
`;

const StyledBuyPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-template-columns: minmax(80rem, 4fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .buy-page-content {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
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
