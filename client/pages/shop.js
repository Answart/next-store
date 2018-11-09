import ProductsList from '../components/ProductsList';


const Shop = props => {
  return (
    <div>
      <ProductsList shopQuery={props.query} />
    </div>
  );
};

export default Shop;
