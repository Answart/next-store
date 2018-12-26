import { Query } from 'react-apollo';
import { StyledShopPage } from '../components/styles/PageStyles';
import NotFound from '../components/NotFound';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import { capWord, getPageTitleProps } from '../lib/utilFns';
import { user } from '../lib/dummyData';
import { SHOP_PRODUCTS_QUERY, PAGINATION_QUERY } from '../graphql';


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
  const { pageLabel, titles } = getPageTitleProps(user, pageQuery);
  return (
    <StyledShopPage>
      <PageTitle
        page={pageLabel}
        titles={titles}
      />

      <Query query={SHOP_PRODUCTS_QUERY} variables={variables}>
        {({ data: shopData, error: shopError, loading: shopLoading }) => (
          <Query query={PAGINATION_QUERY} variables={variables}>
            {({ data: paginData, error: paginError, loading: paginLoading }) => {
              if (shopLoading || paginLoading) return (<p>Loading...</p>);
              const notFound = { message: '' };
              const products = !!shopData ? shopData.products : [];
              const count = !!paginData ? paginData.productsConnection.aggregate.count : 0;
              if ((!!products && !products.length) || !count) notFound.status = 204;
              if ((typeof products === 'undefined') || (!!paginData && typeof paginData.productsConnection === 'undefined')) notFound.status = 404;
              if (shopError || paginError) {
                notFound.status = 400;
                notFound.message = shopError ? shopError.message : paginError.message.replace('GraphQL error: ', '');
              };
              return (
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
              );
            }}
          </Query>
        )}
      </Query>
    </StyledShopPage>
  );
};

export default Shop;
