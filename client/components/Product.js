import React, { Component } from 'react';
import Link from 'next/link';
import StyledProduct from './styles/ProductStyles';
import ProductVariants from './ProductVariants';


const product = {
  id: "cjo8aw4p37ov20a010z26ixi9",
  department: "accessories",
  title: "Peggs Gold Edition Analog Watch Peggs Gold Edition Analog ",
  description: "Limited Edition watch from the 2018 Fall fashion line.",
  image: "peggswatch.jpg",
  category: "Sport",
  brand: "Peggs",
  status: "",
  url: "",
  user: { name: "alexy" },
  productVariants: [
    {
      id: "cjo8awitz7ox30a01gbzxtr4y",
      quantity: 3,
      color: "Black",
      size: "S",
      price: 4400
    }, {
      id: "cjo8awitz7ox30a01gbzxtr4y",
      quantity: 3,
      color: "Black",
      size: "M",
      price: 4400
    }, {
      id: "cjo8awitz7ox30a01gbzxtr4y",
      quantity: 2,
      color: "Red",
      size: "S",
      price: 4000
    }
  ]
}

class Product extends Component {
  render() {
    const id = this.props.id;
    return (
      <StyledProduct>
        <div className="buy-prdct-imgs">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="buy-prdct-content">
          <h3 className="buy-prdct-title buy-prdct-padding">
            {product.title}
          </h3>

          <div className="buy-prdct-creator buy-prdct-padding">
            By
            <Link href={{
              pathname: `/shop`,
              query: { name: `${product.user.name}` }
            }}>
              <a> {product.user.name}</a>
            </Link>
          </div>

          {product.productVariants && product.productVariants.length &&
            <ProductVariants
              productId={product.id}
              allVariants={product.productVariants}
            />
          }

          <div className="buy-prdct-desc buy-prdct-padding">
            <strong>Description:</strong>
            <p>{product.description}</p>

            {product.brand && (
              <div className="buy-prdct-brand">
                <strong>Brand: </strong>{product.brand}
              </div>
            )}
          </div>
        </div>
      </StyledProduct>
    );
  }
}

export default Product;
