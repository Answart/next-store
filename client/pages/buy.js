import SingleProduct from '../components/SingleProduct';
import PageTitle from '../components/PageTitle';
import Product from '../components/Product';
import { StyledBuyPage } from '../components/styles/PageStyles';
import { user } from '../lib/dummyData';


const BuyProductPage = props => {
  return (
    <SingleProduct variables={{ id: props.query.id }}>
      {({ data, error, loading }) => {
        if (loading) return (<p>Loading...</p>);
        if (error) return (<p>Error: {error.message}</p>);
        const { product } = data;
        if (!product) return (<p>No product found.</p>);
        const viewerIsCreator = product.user.id === user.id;
        return (
          <StyledBuyPage>
            <PageTitle
              page={product.department}
              titles={[{ label: product.title }]}
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
