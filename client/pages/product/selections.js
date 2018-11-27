import Link from 'next/link';
import { StyledEditPage } from '../../components/styles/PageStyles';
import SingleProduct from '../../components/SingleProduct';
import EditProductVariants from '../../components/EditProductVariants';


const EditProductVariantsPage = props => {
  const { id } = props.query;
  return (
    <SingleProduct variables={{ id }}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const { product } = data;
        const productTitle = product ? product.title : '';
        return (
          <StyledEditPage>
            <div className="edit-pg-navi">
              <Link href={{
                pathname: `/product/add`,
                query: {
                  id,
                  title: productTitle
                }
              }}><a className="undrln-btn">
                Add Selection &#8811;
              </a></Link>
            </div>

            <div className="edit-pg-content">
              {!product.productVariants.length ? (
                <p>This product does not have any selections.</p>
              ) : (
                <EditProductVariants
                  productVariants={product.productVariants}
                  productId={id}
                />
              )}
            </div>
          </StyledEditPage>
        )
      }}
    </SingleProduct>
  );
};


export default EditProductVariantsPage;
