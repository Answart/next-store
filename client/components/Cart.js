import { StyledCartPage } from './styles/PageStyles';


const Cart = () => (
            <StyledCartPage open={true}>
              <header>
                <div className="cart-title">
                  <button><h2>&times;</h2></button>

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
