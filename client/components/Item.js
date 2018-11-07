import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';


const ItemStyles = styled.div`
  padding: 1rem;
  img {
    display: grid;
    grid-auto-columns: 1fr;
    min-height: 32rem;
    min-width: 100%;
  }
  a {
    padding: 0;
    text-transform: none;
  }
`;

const ItemInfo = styled.div`
  padding: 0.2rem 0;
  a {
    padding: 0.2rem 0;
    text-transform: none;
    color: ${props => props.theme.darkblue};
  }
  .item-title {
    padding: 0.2rem 0;
    font-size: 1.1rem;
    text-align: left;
    font-weight: bold;
  }
  .item-price {
    padding: 0.4rem 0;
    font-size: 0.85rem;
    font-weight: bold;
    color: ${props => props.theme.textGrey};
  }
  .item-sale {
    padding-left: 0.5rem;
    color: ${props => props.theme.orange};
  }
  .item-availability {
    font-style: italic;
    font-size: 1rem;
    color: ${props => props.theme.orange};
  }
`;

const ItemActions = styled.div`
  padding: 0.2rem 0;
  a {
    padding: 0 0.3rem 0 0;
    font-size: 0.85rem;
    color: ${props => props.theme.textGrey};
  }
  button {
    padding: 0.3rem;
    border: 0;
    font-size: 0.9rem;
    font-weight: bold;
    color: ${props => props.theme.textGrey};
  }
`

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id }
          }}
        >
          <a>{item.image && (
            <img src={item.image} alt={item.title} />
          )}</a>
        </Link>

        <ItemInfo>
          <Link
            href={{
              pathname: '/item',
              query: { id: item.id }
            }}
          >
            <a className='item-title'>{item.title}</a>
          </Link>

          <div className='item-price'>
            {item.sale ? (
              <div>
                <span className='line-through'>
                  ${item.price}
                </span>
                <span className='item-price item-sale'>
                  ${item.salePrice}
                </span>
              </div>
            ) : (
              <div>
                ${item.price}
              </div>
            )}
          </div>

          {item.available && (
            <div className="item-availability">
              {item.available}
            </div>
          )}
        </ItemInfo>

        {item.id && (
          <ItemActions>
            <Link
              href={{
                pathname: 'update',
                query: { id: item.id }
              }}
            >
              <a>Edit</a>
            </Link>

            <button id={item.id}>Remove</button>
          </ItemActions>
        )}
      </ItemStyles>
    );
  }
}
