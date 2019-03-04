import { Query } from 'react-apollo';
import { StyledCart } from './styles/CartStyles';
import { StyledCartTable, StyledTotalsTable, StyledCartItem } from './styles/TableStyles';
import User from './User';
import CartItem from './CartItem';
import NotFound from './NotFound';
import SvgIcon from './SvgIcon';
import { ToggleCart, CheckoutCart } from './Buttons';
import { formatMoney, getCartTotals } from '../lib/utils';
import { LOCAL_CARTOPEN_QUERY } from '../graphql';


const Cart = ({ me }) => (
  <Query query={LOCAL_CARTOPEN_QUERY}>
    {({ data: localData, error: localError }) => {
      const myCart = (!!me && !!me.cart)
        ? me.cart
        : [];
      const imgUrl = (!!myCart.length && !!myCart[0].variant)
        ? myCart[0].variant.image.image_url
        : "";
      const { totalQuantity, totalShipping, totalSalesTax, subTotal } = getCartTotals(myCart);
      const totalAmount = (subTotal + totalShipping + totalSalesTax);
      return (
        <StyledCart open={localData.cartOpen}>
          <header>
            <div className="cart-title">
              <ToggleCart>
                <SvgIcon width={10} name='ex' />
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
                {(!me) ? (
                  <StyledCartItem>
                    <td className="cart-page">
                      <NotFound status={400} />
                    </td>
                  </StyledCartItem>
                ) : (
                  <>
                    {myCart.map(cartItem =>
                      <CartItem key={cartItem.id} id={cartItem.id}
                        quantity={cartItem.quantity}
                        variant={cartItem.variant}
                      />
                    )}
                  </>
                )}
              </tbody>
            </StyledCartTable>
          </div>

          <footer>
            <div>
              <StyledTotalsTable>
                <tbody>
                  <tr>
                    <td>Subtotal</td>

                    <td>{formatMoney(subTotal)}</td>
                  </tr>

                  <tr>
                    <td>Shipping</td>

                    <td>{formatMoney(totalShipping)}</td>
                  </tr>

                  <tr className="totals-table-last-item">
                    <td>Sales Tax</td>

                    <td>{formatMoney(totalSalesTax)}</td>
                  </tr>

                  <tr>
                    <td>Estimated Total</td>

                    <td>{formatMoney(totalAmount)}</td>
                  </tr>
                </tbody>
              </StyledTotalsTable>
            </div>

            <div className="cart-close">
              <CheckoutCart
                totalQuantity={totalQuantity}
                totalAmount={totalAmount}
                email={!!me ? me.email : ""}
                image_url={imgUrl}
                disabled={!me || totalQuantity === 0}
              >
                Checkout
              </CheckoutCart>
            </div>
          </footer>
        </StyledCart>
      )
    }}
  </Query>
);


export default Cart;
