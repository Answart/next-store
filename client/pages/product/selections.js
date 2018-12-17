import Link from 'next/link';
import { StyledEditPage } from '../../components/styles/PageStyles';
import NotFound from '../../components/NotFound';
import SingleProduct from '../../components/SingleProduct';
import PageTitle from '../../components/PageTitle';
import EditProductVariants from '../../components/EditProductVariants';
import { user } from '../../lib/dummyData';


const EditProductVariantsPage = props => {
  const { id } = props.query;
  return (
    <SingleProduct variables={{ id }}>
      {({ data, error, loading }) => {
        if (loading) return (<p>Loading...</p>);
        if (error) return (<NotFound status={400} message={error.message} />);
        const { product } = data;
        if (typeof product === 'undefined') return (<NotFound status={404} />);
        const viewerIsCreator = product.user.id === user.id;
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
              {!product.variants.length ? (
                <p>This product does not have any selections.</p>
              ) : (
                <EditProductVariants
                  product={product}
                  viewerIsCreator={viewerIsCreator}
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
