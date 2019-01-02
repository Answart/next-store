import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatMoney } from '../lib/utilFns';


const StyledPriceTag = styled.div`
  .price-tag-padding {
    padding: 1rem 0.5rem;
  }
  .price-tag-priceSale {
    color: ${props => props.theme.coral};
  }
`;

const PriceTag = ({ price, sale, salePrice }) => (
  <StyledPriceTag>
    <span className={sale ? 'line-through': ''}>
      {formatMoney(price)}
    </span>

    {sale && (
      <span className='price-tag-padding price-tag-priceSale'>
        {formatMoney(salePrice)}
      </span>
    )}
  </StyledPriceTag>
);

PriceTag.propTypes = {
  price: PropTypes.number.isRequired,
  sale: PropTypes.bool.isRequired,
  salePrice: PropTypes.number
};


export default PriceTag;
