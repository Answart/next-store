import { StyledCreatePage } from '../components/styles/PageStyles';
import { CreateProductForm } from '../components/Forms';
import PageTitle from '../components/PageTitle';


const CreateProductPage = () => (
  <StyledCreatePage>
    <PageTitle page='Create Product' />

    <div className="create-pg-form">
      <CreateProductForm />
    </div>
  </StyledCreatePage>
);


export default CreateProductPage;
