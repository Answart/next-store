import PropTypes from 'prop-types';
import { StyledCreatePage } from '../../components/styles/PageStyles';
import NotFound from '../../components/NotFound';
import SingleProduct from '../../components/SingleProduct';
import PageTitle from '../../components/PageTitle';
import { CreateProductVariantForm } from '../../components/Forms';
import RequireSignin from '../../components/RequireSignin';


const CreateProductVariantPage = ({ query }) => (
  <RequireSignin>
    {({ me }) => (
      <SingleProduct variables={{ id: query.id }}>
        {({ data, error, loading }) => {
          if (loading) return (<p>Loading...</p>);
          if (error) return (<NotFound status={400} message={error.message} />);
          const { product } = data;
          if (typeof product === 'undefined' || product === null) return (<NotFound status={404} />);
          const titles = [{
              label: 'My Products',
              href: {
                pathname: '/shop',
                query: { name: me.name }
              }
            }, {
              label: `Update '${product.title}'`,
              href: {
                pathname: '/product/edit',
                query: { id: product.id },
              }
            }, {
              label: 'Selections',
              href: {
                pathname: '/product/selections',
                query: { id: product.id }
              }
            }, {
              label: 'Add Selection'
          }];
          return (
            <StyledCreatePage>
              <PageTitle
                page={`Update '${product.title}'`}
                titles={titles}
              />

              <div className="create-page-form">
                <CreateProductVariantForm
                  productId={query.id}
                  productImage={product.image}
                />
              </div>
            </StyledCreatePage>
          )
        }}
      </SingleProduct>
    )}
  </RequireSignin>
);

CreateProductVariantPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};


export default CreateProductVariantPage;
