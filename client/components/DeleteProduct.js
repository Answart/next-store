import React, { Component } from 'react';


class DeleteProduct extends Component {
  render() {
    const { id, children } = this.props;
    return (
      <div className="form-actions prdct-padding">
        <button className="dlt-btn"
          disabled={!id}
          onClick={() => {
            if (confirm('Are you sure you want to delete this product?')) {
              console.log('delete product here', id)
            }
          }}
        >
          {children}
        </button>
      </div>
    );
  }
}

export default DeleteProduct;
