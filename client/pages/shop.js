import { Query } from 'react-apollo';
import { StyledShopPage } from '../components/styles/PageStyles';
import NotFound from '../components/NotFound';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import { capWord, getPageTitleProps } from '../lib/utilFns';
import { user } from '../lib/dummyData';
import { SHOP_PRODUCTS_QUERY } from '../graphql';


function getShopProps(pageQuery = {}) {
  const variables = { ...pageQuery };
  variables.online = true;

  if (variables.name && variables.name === user.name) {
    delete variables.online;
  }

  return { variables };
}

const Shop = props => {
  const pageQuery = props.query;
  const { variables } = getShopProps(pageQuery);
  return (
    <Query query={SHOP_PRODUCTS_QUERY}
      variables={variables}
    >
      {({ data, error, loading }) => {
        if (loading) return (<p>Loading...</p>);
        if (error) return (
          <NotFound status={400} message={error.message} />
        );
        const { products } = data;
        if (typeof products === 'undefined' || products === null) return (
          <NotFound status={404} />
        );
        if (!products.length) return (
          <NotFound status={204} message='No products found.' />
        );
        const { pageLabel, titles } = getPageTitleProps(user, pageQuery);
        return (
          <StyledShopPage>
            <PageTitle
              page={pageLabel}
              titles={titles}
            />

            <div className="shop-pg-filters">
              Filters
            </div>

            <div className="shop-pg-lst">
              <div className="shop-pg-pagin">
                <div>Sort here</div>

                <div>Pagination here</div>
              </div>

              <ProductsList
                products={products}
                editView={!variables.online}
              />

              <div className="shop-pg-pagin">
                <div>Sort here</div>

                <div>Pagination here</div>
              </div>
            </div>
          </StyledShopPage>
        );
      }}
    </Query>
  );
};

export default Shop;
