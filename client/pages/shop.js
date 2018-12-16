import { Query } from 'react-apollo';
import { StyledShopPage } from '../components/styles/PageStyles';
import NotFound from '../components/NotFound';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import { capWord } from '../lib/utilFns';
import { user } from '../lib/dummyData';
import { SHOP_PRODUCTS_QUERY } from '../graphql';


function getShopProps(variables = {}) {
  let pageLabel = '';
  variables.online = true;

  if (variables.department) {
    pageLabel = capWord(variables.department);
  } else if (variables.name) {
    if (variables.name === user.name) {
      pageLabel = 'My Products';
      delete variables.online;
    } else {
      pageLabel = capWord(variables.name);
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
