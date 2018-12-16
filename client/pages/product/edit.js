import Link from 'next/link';
import { StyledEditPage } from '../../components/styles/PageStyles';
import NotFound from '../../components/NotFound';
import SingleProduct from '../../components/SingleProduct';
import PageTitle from '../../components/PageTitle';
import DeleteProduct from '../../components/Buttons/DeleteProduct';
import { UpdateProductForm } from '../../components/Forms';


const EditProductPage = props => {
  const { id } = props.query;
  return (
    <SingleProduct variables={{ id }}>
      {({ data, error, loading }) => {
        if (loading) return (<p>Loading...</p>);
        if (error) return (<NotFound status={400} message={error.message} />);
        const { product } = data;
        if (typeof product === 'undefined') return (<NotFound status={404} />);
        return (
          <StyledEditPage>
            <PageTitle
              page='Edit'
              titles={[{ label: product.title }]}
            />

            <div className="edit-pg-navi">
              <Link href={{
                pathname: `/product/selections`,
                query: { id }
              }}><a className="undrln-btn">
                Selections &#8811;
              </a></Link>
            </div>

            <div className="edit-pg-content">
              <UpdateProductForm product={product} />

              <div className="edit-pg-content-footer">
                <DeleteProduct id={id}>Delete Product</DeleteProduct>
              </div>

            </div>
          </StyledEditPage>
        )
      }}
    </SingleProduct>
  );
};


export default EditProductPage;
