import { StyledCartPage } from './styles/PageStyles';
import ToggleCart from './Buttons/ToggleCart';


const Cart = () => (
            <StyledCartPage open={true}>
              <header>
                <div className="cart-title">
                  <ToggleCart>
                    <h2>&times;</h2>
                  </ToggleCart>

                  <h2>Your Cart</h2>
                </div>
              </header>

              <div className="cart-body">
                StyledCartTable
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
);


export default Cart;
