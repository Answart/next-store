import PropTypes from 'prop-types';
import SingleProduct from '../components/SingleProduct';
import NotFound from '../components/NotFound';
import PageTitle from '../components/PageTitle';
import Product from '../components/Product';
import AddToCart from '../components/Buttons/AddToCart';
import { StyledBuyPage } from '../components/styles/PageStyles';


const BuyPage = ({ query }) => (
  <SingleProduct variables={{ id: query.id }}>
    {({ data, error, loading }) => {
      if (loading) return (<p>Loading...</p>);
      if (error) return (<NotFound status={400} message={error.message} />);
      const { product } = data;
      if (typeof product === 'undefined' || product === null) return (<NotFound status={404} />);
      return (
        <StyledBuyPage>
          <PageTitle
            page={product.department}
            titles={[{ label: product.title }]}
          />

          <div className="buy-page-content">
            <Product
              product={product}
              demoView={false}
              variantActionComponent={AddToCart}
            />
          </div>
        </StyledBuyPage>
      )
    }}
  </SingleProduct>
);

BuyPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};


export default BuyPage;
