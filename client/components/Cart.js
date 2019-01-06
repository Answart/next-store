import { Query } from 'react-apollo';
import { StyledCartPage } from './styles/PageStyles';
import { StyledCartTable } from './styles/TableStyles';
import ToggleCart from './Buttons/ToggleCart';
import { LOCAL_CARTOPEN_QUERY } from '../graphql';


const Cart = () => (
  <Query query={LOCAL_CARTOPEN_QUERY}>
    {({ data: localData, error: localError }) => {
          if (localError) return null;
          return (
            <StyledCartPage open={localData.cartOpen}>
              <header>
                <div className="cart-title">
                  <ToggleCart>
                    <h2>&times;</h2>
                  </ToggleCart>

                  <h2>Your Cart</h2>
                </div>
              </header>

              <div className="cart-body">
                <StyledCartTable>
                  <thead>
                    <tr>
                      <th>Product</th>

                      <th>Quantity</th>

                      <th>Total Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>CartItem here</td>
                    </tr>
                  </tbody>
                </StyledCartTable>
              </div>

              <footer>
                <div>
                  StyledTotalsTable
                </div>

                <div className="cart-close">
                  CheckoutCart
                </div>
              </footer>
            </StyledCartPage>
          )
    }}
  </Query>
);


export default Cart;
