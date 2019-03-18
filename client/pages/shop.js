import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { StyledShopPage } from '../components/styles/PageStyles';
import NotFound from '../components/NotFound';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import User from '../components/User';
import { capWord, getPageTitleProps, getQueryVariables } from '../lib/utils';
import { SHOP_PRODUCTS_QUERY, PAGINATION_QUERY } from '../graphql';


const ShopPage = ({ query }) => (
  <User>
    {({ data: userData, loading: userLoading, error: userError }) => {
      if (userLoading) return (<p>Loading...</p>);
      if (userError) return (<NotFound status={400} message={userError.message} />);
      const me = !!userData ? userData.me : null;
      const { pageLabel, titles } = getPageTitleProps(me, query);
      const variables = getQueryVariables(query);
      if (!!me && variables.name && variables.name === me.name) {
        delete variables.online;
      } else {
        variables.online = true;
      }
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
                  const products = (!!shopData && !!shopData.products)
                    ? shopData.products
                    : [];
                  const count = (!!paginData && !!paginData.productsConnection)
                    ? paginData.productsConnection.aggregate.count
                    : 0;
                  if ((!!products && !products.length) || !count) notFound.status = 204;
                  if ((typeof products === 'undefined') || (!!paginData && typeof paginData.productsConnection === 'undefined')) notFound.status = 404;
                  if (shopError || paginError) {
                    notFound.status = 400;
                    notFound.message = !!shopError
                      ? shopError.message
                      : (!!paginError && paginError.message)
                        ? paginError.message
                        : '';
                  };
                  return (
                    <div className="shop-page-content">
                      <Filter
                        pageQuery={query}
                        products={products}
                      />

                      <div className="shop-page-lst">
                        <Pagination
                          pathname='/shop'
                          pageQuery={query}
                          results={products.length}
                          count={count}
                          disabled={!count}
                        />

                        {(!!notFound.status || !products.length) ? (
                          <NotFound status={notFound.status} message={notFound.message} />
                        ) : (
                          <ProductsList
                            products={products}
                            editView={!variables.online}
                            userId={!!me ? me.id : null}
                          />
                        )}

                        <Pagination
                          pathname='/shop'
                          pageQuery={query}
                          results={products.length}
                          count={count}
                          disabled={!count}
                        />
                      </div>
                    </div>
                  )
                }}
              </Query>
            )}
          </Query>
        </StyledShopPage>
      )
    }}
  </User>
);

ShopPage.propTypes = {
  query: PropTypes.object.isRequired
};


export default ShopPage;
