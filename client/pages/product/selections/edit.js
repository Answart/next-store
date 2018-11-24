import EditProductVariant from '../../../components/EditProductVariant';


const EditProductVariantPage = props => {
  const { id, title } = props.query;
  return (
    <div>
      <EditProductVariant id={id} productTitle={title} />
    </div>
  );
};

export default EditProductVariantPage;
