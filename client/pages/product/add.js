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
              label: product.title,
              href: {
                pathname: '/product/edit',
                query
              }
            }, {
              label: 'Selections',
              href: {
                pathname: '/product/selections',
                query
              }
            }, {
              label: 'Add Selection'
          }];
          return (
            <StyledCreatePage>
              <PageTitle
                page='Edit Product'
                titles={titles}
              />

              <div className="create-pg-form">
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
