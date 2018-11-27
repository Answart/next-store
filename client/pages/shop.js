import { StyledShopPage } from '../components/styles/PageStyles';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import { capWord } from '../lib/utilFns';


function getShopProps(variables = {}) {
  let pageLabel = '';
  let queryType = 'all';

  if (variables.department) {
    queryType = 'department';
    pageLabel = capWord(variables.department);
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
        <ProductsList
          variables={variables}
          queryType={queryType}
        />
      </div>
    </StyledShopPage>
  );
};

export default Shop;
