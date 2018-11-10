import SelectProduct from '../../components/SelectProduct';


const BuyProductPage = props => {
  return (
    <div>
      <SelectProduct id={props.query.id} />
    </div>
  );
};

export default BuyProductPage;
