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

const PriceTag = props => (
  <StyledPriceTag>
    {props.variant.sale ? (
      <div>
        <span className='line-through'>
          {formatMoney(props.variant.price)}
        </span>
        <span className='price-tag-padding price-tag-priceSale'>
          {formatMoney(props.variant.salePrice)}
        </span>
      </div>
    ) : (
      <div>{formatMoney(props.variant.price)}</div>
    )}
  </StyledPriceTag>
);

PriceTag.propTypes = {
  variant: PropTypes.shape({
    price: PropTypes.number,
    sale: PropTypes.bool.isRequired,
    salePrice: PropTypes.number
  })
};


export default PriceTag;
