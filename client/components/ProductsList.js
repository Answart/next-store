import PropTypes from 'prop-types';
import Link from 'next/link';
import { StyledProductsList, StyledProductsListItem } from './styles/ProductStyles';
import PriceTag from './PriceTag';
import DeleteProduct from './Buttons/DeleteProduct';
import { user } from '../lib/dummyData';


const ProductsList = ({ products, editView }) => (
  <StyledProductsList>
    {products.map(prdct => {
      const viewerIsCreator = prdct
        ? prdct.user.id === user.id
        : false;
      const variant = prdct.variants.length
        ? prdct.variants[0]
        : null;
      return (
        <StyledProductsListItem key={prdct.id} >
          <Link href={{
            pathname: "/buy",
            query: { id: prdct.id }
          }}><a>
            {prdct.image && (
              <img width="400" height="610" src={prdct.image.image_url} alt={prdct.title} />
            )}
          </a></Link>

          <div className="prdct-itm-info">
            <Link href={{
              pathname: "/buy",
              query: { id: prdct.id }
            }}><a className='prdct-itm-title'>
              {prdct.title}
            </a></Link>

            {variant && variant.price && (
              <div className="prdct-itm-price">
                <PriceTag variant={variant} />
              </div>
            )}

            {prdct.online && variant && (
              <div className="prdct-itm-avail">
                {variant.availability}
              </div>
            )}
          </div>

          {viewerIsCreator && editView && (
            <span className="prdct-itm-actns">
              <Link href={{
                pathname: "/product/edit",
                query: { id: prdct.id }
              }}><a>
                Edit
              </a></Link>

              <DeleteProduct className="undrln-btn"
                id={prdct.id}
              >Delete</DeleteProduct>
            </span>
          )}

          {!prdct.online && (
            <span><i className="prdct-itm-actns">
              (Offline)
            </i></span>
          )}
        </StyledProductsListItem>
      )
    })}
  </StyledProductsList>
);

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    image: PropTypes.shape({
      image_url: PropTypes.string.isRequired
    }).isRequired,
    variants: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.number.isRequired,
      sale: PropTypes.bool.isRequired,
      salePrice: PropTypes.number.isRequired,
      availability: PropTypes.string.isRequired
    })).isRequired
  })).isRequired,
  editView: PropTypes.bool.isRequired
};


export default ProductsList;
