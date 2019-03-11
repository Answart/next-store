import PropTypes from 'prop-types';
import Link from 'next/link';
import { StyledEditPage } from '../../components/styles/PageStyles';
import NotFound from '../../components/NotFound';
import SingleProduct from '../../components/SingleProduct';
import PageTitle from '../../components/PageTitle';
import EditProductVariants from '../../components/EditProductVariants';
import RequireSignin from '../../components/RequireSignin';


const EditProductVariantsPage = ({ query }) => (
  <RequireSignin>
    {({ me }) => (
      <SingleProduct variables={{ id: query.id }}>
        {({ data, error, loading }) => {
          if (loading) return (<p>Loading...</p>);
          if (error) return (<NotFound status={400} message={error.message} />);
          const { product } = data;
          if (typeof product === 'undefined' || product === null) return (<NotFound status={404} />);
          const productTitle = product ? product.title : '';
          const titles = [{
              label: 'My Products',
              href: {
                pathname: '/shop',
                query: { name: me.name }
              }
            }, {
              label: `Update '${productTitle}'`,
              href: {
                pathname: '/product/edit',
                query: { id: product.id },
              }
            }, {
              label: 'Selections'
          }];
          return (
            <StyledEditPage>
              <PageTitle
                page={`Update '${productTitle}'`}
                titles={titles}
              />

              <div className="edit-pg-navi">
                <Link href={{
                  pathname: `/product/add`,
                  query: {
                    id: query.id,
                    title: productTitle
                  }
                }}>
                  <a className="undrln-btn">
                    Add Selection &#8811;
                  </a>
                </Link>
              </div>

              <div className="edit-pg-content">
                {!product.variants.length ? (
                  <NotFound status={204}
                    message="This product does not have any selections. Click the 'Add Selection' link to add to this list."
                  />
                ) : (
                  <EditProductVariants product={product} />
                )}
              </div>
            </StyledEditPage>
          )
        }}
      </SingleProduct>
    )}
  </RequireSignin>
);

EditProductVariantsPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};


export default EditProductVariantsPage;
