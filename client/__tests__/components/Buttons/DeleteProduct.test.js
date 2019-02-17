import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import {
  mockUser, mockShopProductsVariables, shopProductsQueryProductMock, deleteProductMutationMock, shopProductsQueryNameEmptyMock,
} from '../../../lib/testMocks';
import { fakeProduct } from '../../../lib/testUtils';
import { DeleteProduct } from '../../../components/Buttons';
import { SHOP_PRODUCTS_QUERY } from '../../../graphql';

const mocks = [
  { ...shopProductsQueryProductMock },
  { ...shopProductsQueryNameEmptyMock },
  { ...deleteProductMutationMock },
];
const mockProduct = fakeProduct();


describe('<DeleteProduct />', () => {
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <DeleteProduct id={mockProduct.id} userName={mockUser.name}>Delete</DeleteProduct>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('deletes product by id', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <DeleteProduct id={mockProduct.id} userName={mockUser.name}>Delete</DeleteProduct>;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    Router.router = { push: jest.fn() };
    const { data: { products } } = await apolloClient.query({ query: SHOP_PRODUCTS_QUERY, variables: { ...mockShopProductsVariables } });
    expect(products.length).toBe(1);
    expect(products[0].id).toBe('pr0duct1d');
    wrapper.find('button').simulate('click');
    const { data: { products: products2 } } = await apolloClient.query({ query: SHOP_PRODUCTS_QUERY, variables: { name: mockUser.name } });
    expect(products2.length).toBe(0);
    wrapper.unmount();
  });

  it('routes to shop page after successful deletion', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <DeleteProduct id={mockProduct.id} userName={mockUser.name}>Delete</DeleteProduct>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    Router.router = { push: jest.fn() };
    wrapper.find('button').simulate('click');
    await wait(50);
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({ pathname: "/shop", query: { name: mockUser.name } });
    wrapper.unmount();
  });
});