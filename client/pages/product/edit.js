import PropTypes from 'prop-types';
import Link from 'next/link';
import { StyledEditPage } from '../../components/styles/PageStyles';
import SingleProduct from '../../components/SingleProduct';
import NotFound from '../../components/NotFound';
import PageTitle from '../../components/PageTitle';
import { DeleteProduct } from '../../components/Buttons';
import { UpdateProductForm } from '../../components/Forms';
import RequireSignin from '../../components/RequireSignin';
import SvgIcon from '../../components/SvgIcon';


const EditProductPage = ({ query }) => (
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
              label: `Update '${product.title}'`
          }];
          return (
            <StyledEditPage>
              <PageTitle
                page={`Update '${product.title}'`}
                titles={titles}
              />

              <div className="edit-page-navi">
                <Link href={{
                  pathname: `/product/selections`,
                  query
                }}>
                  <a className="undrln-btn">
                    Selections <SvgIcon width={7} name='doubleRightArrow' />
                  </a>
                </Link>
              </div>

              <div className="edit-page-content">
                <UpdateProductForm product={product} />

                <div className="edit-page-content-footer">
                  <DeleteProduct
                    id={query.id}
                    userName={product.user.name}
                  >
                    Delete Product
                  </DeleteProduct>
                </div>

              </div>
            </StyledEditPage>
          )
        }}
      </SingleProduct>
    )}
  </RequireSignin>
);

EditProductPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};


export default EditProductPage;
