import { StyledCreatePage } from '../components/styles/PageStyles';
import { CreateProductForm } from '../components/Forms';
import PageTitle from '../components/PageTitle';
import RequireSignin from '../components/RequireSignin';


const CreateProductPage = () => (
  <StyledCreatePage>
    <PageTitle page='Create Product' />

    <div className="create-page-form">
      <RequireSignin>
        {({ me }) => (
          <CreateProductForm />
        )}
      </RequireSignin>
    </div>
  </StyledCreatePage>
);


export default CreateProductPage;
