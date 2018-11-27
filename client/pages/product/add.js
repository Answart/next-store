import { StyledCreatePage } from '../../components/styles/PageStyles';
import PageTitle from '../../components/PageTitle';
import { CreateProductVariantForm } from '../../components/Forms';


const CreateProductVariantPage = props => {
  let { id, title } = props.query;
  return (
    <StyledCreatePage>
      <PageTitle
        page='Edit'
        titles={[{
            label: title,
            href: {
              pathname: '/product/edit',
              query: { id }
            }
          }, {
            label: 'Selections',
            href: {
              pathname: '/product/selections',
              query: { id }
            }
          }, {
            label: 'Add Selection'
        }]}
      />

      <div className="create-pg-form">
        <CreateProductVariantForm
          productTitle={title}
          productId={id}
        />
      </div>
    </StyledCreatePage>
  );
};


export default CreateProductVariantPage;
