import { StyledCreatePage } from '../components/styles/PageStyles';
import { CreateProductForm } from '../components/Forms';
import PageTitle from '../components/PageTitle';
import RequireSignin from '../components/RequireSignin';


const CreateProductPage = () => (
  <StyledCreatePage>
    <PageTitle page='Create Product' />

    <div className="create-pg-form">
      <RequireSignin>
        <CreateProductForm />
      </RequireSignin>
    </div>
  </StyledCreatePage>
);


export default CreateProductPage;
