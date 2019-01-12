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
    padding: 2rem;
  }
  .red-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.red};
    background-color: ${props => props.theme.red};
  }
  .orange-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.orange};
    background-color: ${props => props.theme.orange};
  }
  .yellow-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.yellow};
    background-color: ${props => props.theme.yellow};
  }
  .green-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.green};
    background-color: ${props => props.theme.green};
  }
  .blue-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.blue};
    background-color: ${props => props.theme.blue};
  }
  .purple-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.purple};
    background-color: ${props => props.theme.purple};
  }
  .pink-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.pink};
    background-color: ${props => props.theme.pink};
  }
  .brown-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.brown};
    background-color: ${props => props.theme.brown};
  }
  .black-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.black};
    background-color: ${props => props.theme.black};
  }
  .white-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: white;
    border: 1px solid ${props => props.theme.lightGrey};
  }
  .silver-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.lightGrey}; /* Old browsers */
    background: -o-linear-gradient(45deg, ${props => props.theme.lightGrey} 20%, white 85%, white 100%); /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(45deg, ${props => props.theme.lightGrey} 20%, white 85%, white 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, ${props => props.theme.lightGrey} 20%, white 85%, white 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, ${props => props.theme.lightGrey} 20%, white 85%, white 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${props => props.theme.lightGrey}', endColorstr='white',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .gold-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: gold; /* Old browsers */
    background: -moz-linear-gradient(45deg, ${props => props.theme.gold} 20%, white 85%, white 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, ${props => props.theme.gold} 20%, white 85%, white 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, ${props => props.theme.gold} 20%, white 85%, white 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${props => props.theme.gold}', endColorstr='white',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .multi-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${props => props.theme.beige}; /* Old browsers */
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
  margin: 0 auto;
  .shop-pg-content {
    display: grid;
    grid-row: 2 / -1;
    grid-template-columns: 18rem 1fr;
    grid-gap: 3rem;
    grid-auto-flow: column;
    .shop-pg-lst {
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
  color: ${props => props.theme.darkGrey};
`;

export {
  StyledPage,
  StyledShopPage,
  StyledCreatePage,
  StyledEditPage,
  StyledBuyPage,
  StyledSignupPage,
  StyledPageTitle
};
