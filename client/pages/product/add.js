import { StyledCreatePage } from '../../components/styles/PageStyles';
import SingleProduct from '../../components/SingleProduct';
import PageTitle from '../../components/PageTitle';
import { CreateProductVariantForm } from '../../components/Forms';


const CreateProductVariantPage = props => {
  let { id } = props.query;
  return (
    <SingleProduct variables={{ id }}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const { product } = data;
        const titles = [{
            label: product.title,
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
        }];
        return (
          <StyledCreatePage>
            <PageTitle
              page='Edit'
              titles={titles}
            />

            <div className="create-pg-form">
              <CreateProductVariantForm
                productId={id}
                productTitle={product.title}
              />
            </div>
          </StyledCreatePage>
        )
      }}
    </SingleProduct>
  );
};


export default CreateProductVariantPage;
