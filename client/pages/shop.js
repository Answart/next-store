import { Query } from 'react-apollo';
import { StyledShopPage } from '../components/styles/PageStyles';
import NotFound from '../components/NotFound';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import { capWord } from '../lib/utilFns';
import {
  PRODUCTS_QUERY,
  ONLINE_PRODUCTS_QUERY,
  SELLERS_PRODUCTS_QUERY,
  ONLINE_SELLERS_PRODUCTS_QUERY,
  ONLINE_DEPT_PRODUCTS_QUERY
} from '../graphql';


const queries = {
  all: PRODUCTS_QUERY,
  online: ONLINE_PRODUCTS_QUERY,
  my: SELLERS_PRODUCTS_QUERY,
  name: ONLINE_SELLERS_PRODUCTS_QUERY,
  department: ONLINE_DEPT_PRODUCTS_QUERY
};

function getShopProps(variables = {}) {
  let pageLabel = '';
  let queryType = 'all';

  if (variables.department) {
    queryType = 'department';
    pageLabel = capWord(variables.department);
    variables.online = true;
  } else if (variables.name) {
    if (typeof variables.online !== 'undefined') {
      queryType = 'name'
      pageLabel = capWord(variables.name);
    } else {
      queryType = 'my'
      pageLabel = 'My Products'
    }
  } else if (typeof variables.online !== 'undefined') {
    queryType = 'online';
  }

  return { variables, pageLabel, queryType };
}

const Shop = props => {
  const shopProps = getShopProps(props.query);
  const { variables, pageLabel, queryType } = shopProps;
  const query = queries[queryType];
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
        <Query query={query}
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
