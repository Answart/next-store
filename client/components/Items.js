import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Item from './Item';


const items = [
  {
    id: 1,
    title: 'title 1title 1title 1title 1title 1',
    price: 44.45,
    sale: 14.45,
    description: 'description 1',
    available: 'In Stock',
    image: 'asldfksjf',
    largeImage: 'asldfksjf'
  }, {
    id: 2,
    title: 'title 2title 2title 2',
    price: 110.90,
    description: 'description 2',
    image: 'asldfksjf',
    largeImage: 'asldfksjf'
  }, {
    id: 3,
    title: 'title 3',
    price: 110.90,
    description: 'description 3',
    image: 'asldfksjf',
    available: '3 left',
    largeImage: 'asldfksjf'
  }, {
    id: 4,
    title: 'title 4',
    price: 110.90,
    description: 'description 4',
    image: 'asldfksjf',
    largeImage: 'asldfksjf'
  }
];
let data = { items };

const ItemsListStyles = styled.div`
  display: grid;
  grid-template-rows: 0.5rem 5rem 10fr;
  grid-template-columns: 1fr 6fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Filters = styled.div`
  grid-column: 1 / 1;
  grid-row: 2 / -1;
  max-width: ${props => props.theme.maxWidth};
`;

const Pagination = styled.div`
  grid-column: 2 / -1;
  grid-row: 2 / 2;
  max-width: ${props => props.theme.maxWidth};
`;

const List = styled.div`
  grid-column: 2 / -1;
  grid-row: 3 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 0.5rem;
  justify-content: space-between;
  height: 100%;
`;

class Items extends Component {
  render() {
    return (
      <ItemsListStyles>
        <i>{this.props.category}</i>

        <Filters>
          Filters
        </Filters>

        <Pagination>
          Pagination
        </Pagination>

        <List>
          {data.items.length && data.items.map(item =>
            <Item item={item} key={item.id} />
          )}
        </List>
      </ItemsListStyles>
    );
  }
}


export default Items;
