import Product from '../../components/Product';


const BuyProductPage = props => {
  return (
    <div>
      <Product id={props.query.id} />
    </div>
  );
};

export default BuyProductPage;
