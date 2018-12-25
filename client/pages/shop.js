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
        const notFound = { message: '' };
        const products = !!data ? data.products : [];
        if (typeof products === 'undefined') notFound.status = 404;
        if (!!products && !products.length) notFound.status = 204;
        if (error) {
          notFound.status = 400;
          notFound.message = error.message;
        };
        const { pageLabel, titles } = getPageTitleProps(user, pageQuery);
        return (
          <StyledShopPage>
            <PageTitle
              page={pageLabel}
              titles={titles}
            />

            <div className="shop-pg-content">
              <div>Filter here</div>

              <div className="shop-pg-lst">
                <div>Pagination here</div>

                {(!!notFound.status || !products.length) ? (
                  <NotFound status={notFound.status} message={notFound.message} />
                ) : (
                  <ProductsList
                    products={products}
                    editView={!variables.online}
                  />
                )}

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
