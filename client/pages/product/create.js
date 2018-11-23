import { StyledCreateProduct } from '../../components/styles/ProductStyles';
import CreateProductForm from '../../components/Forms/CreateProductForm';


const CreateProductPage = props => {
  return (
    <StyledCreateProduct>
      <CreateProductForm />
    </StyledCreateProduct>
  );
};

export default CreateProductPage;
