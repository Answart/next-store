import PropTypes from 'prop-types';
import { formatMoney } from '../lib/utilFns';
import styled from 'styled-components';


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
  variant: PropTypes.object.isRequired,
};


export default PriceTag;
