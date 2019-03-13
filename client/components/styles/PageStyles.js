import styled from 'styled-components';


const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.darkGrey};
  a.undrln-btn, button.undrln-btn {
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    color: ${props => props.theme.darkGrey};
    &:hover, &:active, &:focus {
      color: ${props => props.theme.darkBlue};
      text-decoration: underline ${props => props.theme.coral};
    }
  }
  a.big-btn, button.big-btn {
    width: auto;
    padding: 0.5rem 1.4rem;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    background-color: ${props => props.theme.darkBlue};
    &:hover, &:active, &:focus {
      color: white;
      background-color: ${props => props.theme.black};
    }
  }
  a.dlt-btn, button.dlt-btn  {
    padding: 0.5rem 1.4rem;
    color: ${props => props.theme.red};
    font-size: 1.1rem;
    font-weight: normal;
    &:hover, &:active, &:focus {
      color: ${props => props.theme.red};
      font-weight: bold;
    }
  }
  a.thn-btn, button.thn-btn {
    padding: 0 1rem;
    letter-spacing: 0.02rem;
    font-size: 1.1rem;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    font-weight: normal;
    &:hover, &:active, &:focus {
      color: ${props => props.theme.darkBlue};
      font-weight: normal;
    }
  }
  .line-through {
    text-decoration: line-through ${props => props.theme.red};
  }
  .inner-page {
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem 0;
  }
  .sample-hover {
    width: 2.75rem;
    height: 2.75rem;
    &:hover {
      border: 1px solid ${props => props.theme.darkBlue};
      border-radius: 2.75rem;
      font-weight: bold;
      &:disabled {
        border: 0;
        font-weight: inherit;
      }
    }
  }
  .sample-selected {
    width: 2.75rem;
    height: 2.75rem;
    border: 1px solid ${props => props.theme.darkBlue};
    border-radius: 2.75rem;
    font-weight: bold;
    &:disabled {
      text-decoration: none;
      opacity: 1;
      border: 1px solid ${props => props.theme.grey};
    }
  }
  .color-sphere-sample {
    color: transparent;
    margin: -3.75px 0 0 -3.75px;
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
  }
  .red-color-sample {
    background: ${props => props.theme.red};
    background-color: ${props => props.theme.red};
  }
  .orange-color-sample {
    background: ${props => props.theme.orange};
    background-color: ${props => props.theme.orange};
  }
  .yellow-color-sample {
    background: ${props => props.theme.yellow};
    background-color: ${props => props.theme.yellow};
  }
  .green-color-sample {
    background: ${props => props.theme.green};
    background-color: ${props => props.theme.green};
  }
  .blue-color-sample {
    background: ${props => props.theme.blue};
    background-color: ${props => props.theme.blue};
  }
  .purple-color-sample {
    background: ${props => props.theme.purple};
    background-color: ${props => props.theme.purple};
  }
  .pink-color-sample {
    background: ${props => props.theme.pink};
    background-color: ${props => props.theme.pink};
  }
  .brown-color-sample {
    background: ${props => props.theme.brown};
    background-color: ${props => props.theme.brown};
  }
  .brown-color-sample {
    background: ${props => props.theme.brown};
    background-color: ${props => props.theme.brown};
  }
  .black-color-sample {
    background: ${props => props.theme.black};
    background-color: ${props => props.theme.black};
  }
  .white-color-sample {
    background: white;
    border: 1px solid ${props => props.theme.lightGrey};
  }
  .silver-color-sample {
    background: ${props => props.theme.lightGrey}; /* Old browsers */
    background: -o-linear-gradient(45deg, ${props => props.theme.lightGrey} 20%, white 85%, white 100%); /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(45deg, ${props => props.theme.lightGrey} 20%, white 85%, white 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, ${props => props.theme.lightGrey} 20%, white 85%, white 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, ${props => props.theme.lightGrey} 20%, white 85%, white 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${props => props.theme.lightGrey}', endColorstr='white',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .gold-color-sample {
    background: gold; /* Old browsers */
    background: -moz-linear-gradient(45deg, ${props => props.theme.gold} 20%, white 85%, white 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, ${props => props.theme.gold} 20%, white 85%, white 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, ${props => props.theme.gold} 20%, white 85%, white 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${props => props.theme.gold}', endColorstr='white',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .multi-color-sample {
    background:
      -moz-linear-gradient(circle at 50% 0, ${props => props.theme.red}, rgba(255,0,0,0) 50.71%),
      -moz-linear-gradient(circle at 6.7% 75%, ${props => props.theme.blue}, rgba(0,0,255,0) 70.71%),
      -moz-linear-gradient(circle at 93.3% 75%, ${props => props.theme.yellow}, rgba(0,255,0,0) 100%) beige; /* FF3.6-15 ??? */
    background:
      -webkit-linear-gradient(circle at 50% 0, ${props => props.theme.red}, rgba(255,0,0,0) 50.71%),
      -webkit-linear-gradient(circle at 6.7% 75%, ${props => props.theme.blue}, rgba(0,0,255,0) 70.71%),
      -webkit-linear-gradient(circle at 93.3% 75%, ${props => props.theme.yellow}, rgba(0,255,0,0) 100%) beige; /* Chrome10-25,Safari5.1-6 */
    background:
      radial-gradient(circle at 50% 0, ${props => props.theme.red}, rgba(255,0,0,0) 50.71%),
      radial-gradient(circle at 6.7% 75%, ${props => props.theme.blue}, rgba(0,0,255,0) 70.71%),
      radial-gradient(circle at 93.3% 75%, ${props => props.theme.yellow}, rgba(0,255,0,0) 100%) beige; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${props => props.theme.red}', endColorstr='${props => props.theme.yellow}',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
`;

const StyledShopPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 1fr;
  grid-gap: 3rem;
  max-width: ${props => props.theme.maxWidth};
  padding-bottom: 5rem;
  margin: 0 auto;
  .shop-page-content {
    display: grid;
    grid-row: 2 / -1;
    grid-template-columns: 18rem 1fr;
    grid-auto-flow: column;
    grid-gap: 3rem;
    .shop-page-lst {
      grid-column: 2 / -1;
      display: grid;
      grid-template-rows: 5rem minmax(50rem, 1fr) 5rem;
      grid-gap: 3rem;
      grid-auto-flow: row;
    }
  }
`;

const StyledCreatePage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  padding-bottom: 5rem;
  margin: 0 auto;
  .create-page-form {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50rem, 80rem));
    justify-content: center;
  }
`;

const StyledEditPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 2rem minmax(50rem, 1fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  padding-bottom: 5rem;
  margin: 0 auto;
  .edit-page-navi {
    grid-column: 1 / -1;
    grid-row: 2 / 2;
    text-align: right;
  }
  .edit-page-content {
    grid-column: 1 / 1;
    grid-row: 3 / -1;
    .edit-page-content-footer {
      padding: 5rem 0;
      text-align: center;
    }
  }
`;

const StyledBuyPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  padding-bottom: 5rem;
  margin: 0 auto;
  .buy-page-content {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
    margin-bottom: 18rem;
  }
`;

const StyledSignupPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  padding-bottom: 5rem;
  margin: 0 auto;
  .signup-page-content {
    grid-row: 2 / 2;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 30rem));
    grid-gap: 2.5rem;
    justify-content: center;
    form {
      max-height: 32rem;
    }
  }
`;

const StyledPageTitle = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  font-size: 1.1rem;
  color: ${props => props.theme.darkGrey};
`;

const StyledOrderPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  padding-bottom: 5rem;
  margin: 0 auto;
  .order-page-content {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
  }
`;


export {
  StyledPage,
  StyledShopPage,
  StyledCreatePage,
  StyledEditPage,
  StyledBuyPage,
  StyledSignupPage,
  StyledOrderPage,
  StyledPageTitle,
};
