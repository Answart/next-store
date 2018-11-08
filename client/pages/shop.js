import Products from '../components/Products';


const Shop = props => {
  return (
    <div>
      <Products dept={props.query.department} />
    </div>
  );
};

export default Shop;
