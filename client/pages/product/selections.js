import Link from 'next/link';
import { StyledEditPage } from '../../components/styles/PageStyles';
import NotFound from '../../components/NotFound';
import SingleProduct from '../../components/SingleProduct';
import PageTitle from '../../components/PageTitle';
import EditProductVariants from '../../components/EditProductVariants';


const EditProductVariantsPage = props => {
  const { id } = props.query;
  return (
    <SingleProduct variables={{ id }}>
      {({ data, error, loading }) => {
        if (loading) return (<p>Loading...</p>);
        if (error) return (<NotFound status={400} message={error.message} />);
        const { product } = data;
        if (!product) return (<NotFound status={404} />);
        const productTitle = product ? product.title : '';
        const titles = [{
          label: productTitle,
          href: {
            pathname: '/product/edit',
            query: { id }
          }
        }, {
          label: 'Selections'
        }];
        return (
          <StyledEditPage>
            <PageTitle
              page='Edit'
              titles={titles}
            />

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
                  productId={id}
                  productVariants={product.productVariants}
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
