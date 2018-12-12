import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { StyledProductsList, StyledProductsListItem } from './styles/ProductStyles';
import NotFound from './NotFound';
import PriceTag from './PriceTag';
import formatMoney from '../lib/formatMoney';
import { user } from '../lib/dummyData';
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

class ProductsList extends Component {
  static propTypes = {
    variables: PropTypes.object.isRequired,
    queryType: PropTypes.string.isRequired
  };
  render() {
    const { variables, queryType } = this.props;
    const query = queries[queryType];
    return (
      <Query
        query={query}
        variables={variables}
      >
        {({ data, error, loading }) => {
          if (loading) return (<p>Loading...</p>);
          if (error) return (<NotFound status={400} message={error.message} />);
          const { products } = data;
          if (!products) return (<NotFound status={404} />);
          if (!products.length) return (<NotFound status={204} message='No products found.' />);
          return (
            <StyledProductsList>
              {products.map(prdct => {
                const viewerIsCreator = prdct
                  ? prdct.user.id === user.id
                  : false;
                const variant = prdct.productVariants.length
                  ? prdct.productVariants[0]
                  : null;
                return (
                  <StyledProductsListItem key={prdct.id} >
                    <Link href={{
                      pathname: "/buy",
                      query: { id: prdct.id }
                    }}>
                      <a>{prdct.image && (
                        <img width="400" height="610" src={prdct.image.image_url} alt={prdct.title} />
                      )}</a>
                    </Link>

                    <div className="prdct-itm-info">
                      <Link href={{
                        pathname: "/buy",
                        query: { id: prdct.id }
                      }}>
                        <a className='prdct-itm-title'>{prdct.title}</a>
                      </Link>

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

                    {prdct.id && viewerIsCreator && (
                      <span className="prdct-itm-actns">
                        <Link href={{
                          pathname: "/product/edit",
                          query: { id: prdct.id }
                        }}><a>
                          Edit
                        </a></Link>
                        <button className="undrln-btn"
                          id={prdct.id}
                        >Delete</button>
                      </span>
                    )}

                    {!prdct.online && (
                      <span><i className="prdct-itm-actns">(Offline)</i></span>
                    )}
                  </StyledProductsListItem>
                )
              })};
            </StyledProductsList>
          );
        }}
      </Query>
    );
  }
}

export default ProductsList;
