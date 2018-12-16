import { StyledCreatePage } from '../../components/styles/PageStyles';
import NotFound from '../../components/NotFound';
import SingleProduct from '../../components/SingleProduct';
import PageTitle from '../../components/PageTitle';
import { CreateProductVariantForm } from '../../components/Forms';


const CreateProductVariantPage = props => {
  let { id } = props.query;
  return (
    <SingleProduct variables={{ id }}>
      {({ data, error, loading }) => {
        if (loading) return (<p>Loading...</p>);
        if (error) return (<NotFound status={400} message={error.message} />);
        const { product } = data;
        if (typeof product === 'undefined') return (<NotFound status={404} />);
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
                productImage={product.image}
              />
            </div>
          </StyledCreatePage>
        )
      }}
    </SingleProduct>
  );
};


export default CreateProductVariantPage;
