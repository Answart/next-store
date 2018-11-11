import ProductsList from '../components/ProductsList';


function capWord(string = "") {
  return string.length
    ? (string.charAt(0).toUpperCase() + string.slice(1))
    : "";
}

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
    <div>
      <ProductsList
        variables={variables}
        pageLabel={pageLabel}
        queryType={queryType}
      />
    </div>
  );
};

export default Shop;
