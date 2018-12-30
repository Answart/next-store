import PropTypes from 'prop-types';
import Link from 'next/link';
import { StyledEditPage } from '../../components/styles/PageStyles';
import SingleProduct from '../../components/SingleProduct';
import NotFound from '../../components/NotFound';
import PageTitle from '../../components/PageTitle';
import DeleteProduct from '../../components/Buttons/DeleteProduct';
import { UpdateProductForm } from '../../components/Forms';
import RequireSignin from '../../components/RequireSignin';


const EditProductPage = ({ query }) => (
  <RequireSignin>
    <SingleProduct variables={{ id: query.id }}>
      {({ data, error, loading }) => {
        if (loading) return (<p>Loading...</p>);
        if (error) return (<NotFound status={400} message={error.message} />);
        const { product } = data;
        if (typeof product === 'undefined' || product === null) return (<NotFound status={404} />);
        return (
          <StyledEditPage>
            <PageTitle
              page='Edit Product'
              titles={[{ label: product.title }]}
            />

            <div className="edit-pg-navi">
              <Link href={{
                pathname: `/product/selections`,
                query
              }}><a className="undrln-btn">
                Selections &#8811;
              </a></Link>
            </div>

            <div className="edit-pg-content">
              <UpdateProductForm product={product} />

              <div className="edit-pg-content-footer">
                <DeleteProduct
                  id={query.id}
                  userName={product.user.name}
                >Delete Product</DeleteProduct>
              </div>

            </div>
          </StyledEditPage>
        )
      }}
    </SingleProduct>
  </RequireSignin>
);

EditProductPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};


export default EditProductPage;
