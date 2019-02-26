import PropTypes from 'prop-types';
import Link from 'next/link';
import StyledProduct from './styles/ProductStyles';
import ByCreator from './ByCreator';
import ProductVariants from './ProductVariants';


const Product = props => {
  const { product } = props;
  return (
    <StyledProduct>
      <div className="prdct-imgs">
        <img width="450" height="640" src={product.image.large_image_url} alt={product.title} />
      </div>

      <div className="prdct-content">
        <div id='prdct-title' className="prdct-padding">
          <Link href={{
            pathname: '/buy',
            query: { id: product.id }
          }}>
            <a className="prdct-title">
              {product.title}
            </a>
          </Link>
        </div>

        <ByCreator
          name={product.user.name}
          online={true}
        />

        <div id='prdct-online' className="prdct-padding">
          {!product.online && (
            <i>Offline</i>
          )}
        </div>

        <ProductVariants
          variants={product.variants}
          online={product.online}
          demoView={props.demoView}
          VariantActionComponent={props.variantActionComponent}
          variantAction={props.variantAction}
          variantActionLabel={props.variantActionLabel}
        />

        <div id='prdct-desc' className="prdct-desc prdct-padding">
          <div id="prdct-description">
            <strong>
              Description:
            </strong>

            <p>
              {product.description}
            </p>
          </div>

          {product.brand && (
            <div id="prdct-brand">
              <strong>
                Brand:
              </strong>

              <p>
                {product.brand}
              </p>
            </div>
          )}
        </div>
      </div>
    </StyledProduct>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    brand: PropTypes.string,
    online: PropTypes.bool.isRequired,
    image: PropTypes.shape({
      id: PropTypes.string.isRequired,
      cloudinary_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      transformation: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      large_image_url: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  demoView: PropTypes.bool,
  VariantActionComponent: PropTypes.func,
  variantAction: PropTypes.func,
  variantActionLabel: PropTypes.string
};


export default Product;
