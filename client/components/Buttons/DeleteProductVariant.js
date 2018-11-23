import React, { Component } from 'react';
import Router from 'next/router';


class DeleteProductVariant extends Component {
  render() {
    const { productId, id, children } = this.props;
    return (
          <div className="form-actions prdct-padding">
            <button className="dlt-btn"
              disabled={!id}
              onClick={() => {
                if (confirm('Are you sure you want to delete this selection?')) {
                  deleteProductVariant()
                    .then((res) => {
                      if (productId) {
                        Router.push({
                          pathname: '/edit',
                          query: { id: productId }
                        });
                      }
                    })
                    .catch(err => {
                      alert(err.message);
                    });
                }
              }}
            >
              {children}
            </button>
          </div>
    );
  }
}

export default DeleteProductVariant;
