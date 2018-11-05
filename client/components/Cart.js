import Link from 'next/link';
import styled from 'styled-components';


const CartStyles = styled.div`
  padding-top: 5px;
`;

const Cart = () => (
  <CartStyles>
    <Link href="/cart">
      <a>Cart</a>
    </Link>
  </CartStyles>
);

export default Cart;
