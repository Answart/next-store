import { StyledCreateProduct } from '../../components/styles/ProductStyles';
import { CreateProductForm } from '../../components/Forms';


const CreateProductPage = props => {
  return (
    <StyledCreateProduct>
      <div>Create Product</div>

      <CreateProductForm />
    </StyledCreateProduct>
  );
};

export default CreateProductPage;
