import EditProduct from '../../components/EditProduct';


const EditProductPage = props => {
  return (
    <div>
      <EditProduct id={props.query.id} />
    </div>
  );
};

export default EditProductPage;
