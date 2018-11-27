import SingleProduct from '../components/SingleProduct';
import PageTitle from '../components/PageTitle';
import Product from '../components/Product';
import { StyledBuyPage } from '../components/styles/PageStyles';
import { user } from '../lib/dummyData';


const BuyProductPage = props => {
  return (
    <SingleProduct variables={{ id: props.query.id }}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const { product } = data;
        const productTitle = product ? product.title : '';
        const viewerIsCreator = product
          ? product.user.id === user.id
          : false;
        return (
          <StyledBuyPage>
            <PageTitle
              page={product.department}
              titles={[{ label: productTitle }]}
            />

            <div className="buy-page-content">
              <Product
                product={product}
                viewerIsCreator={viewerIsCreator}
                demoView={false}
              />
            </div>
          </StyledBuyPage>
        )
      }}
    </SingleProduct>
  );
};

export default BuyProductPage;
