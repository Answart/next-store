import { Query } from 'react-apollo';
import { StyledShopPage } from '../components/styles/PageStyles';
import NotFound from '../components/NotFound';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import { capWord } from '../lib/utilFns';
import { SHOP_PRODUCTS_QUERY } from '../graphql';


function getShopProps(variables = {}) {
  let pageLabel = '';

  if (variables.department) {
    pageLabel = capWord(variables.department);
    variables.online = true;
  } else if (variables.name) {
    if (typeof variables.online !== 'undefined') {
      pageLabel = capWord(variables.name);
    } else {
      pageLabel = 'My Products';
    }
  }

  return { variables, pageLabel };
}

const Shop = props => {
  const shopProps = getShopProps(props.query);
  const { variables, pageLabel } = shopProps;
  return (
    <StyledShopPage>
      <PageTitle
        page={pageLabel}
        titles={[]}
      />

      <div className="shop-pg-filters">
        Filters
      </div>

      <div className="shop-pg-pgntn">
        Pagination
      </div>

      <div className="shop-pg-lst">
        <Query query={SHOP_PRODUCTS_QUERY}
          variables={variables}
        >
          {({ data, error, loading }) => {
            if (loading) return (<p>Loading...</p>);
            if (error) return (<NotFound status={400} message={error.message} />);
            const { products } = data;
            if (!products) return (<NotFound status={404} />);
            if (!products.length) return (<NotFound status={204} message='No products found.' />);
            return (
              <ProductsList products={products} />
            );
          }}
        </Query>
      </div>
    </StyledShopPage>
  );
};

export default Shop;
