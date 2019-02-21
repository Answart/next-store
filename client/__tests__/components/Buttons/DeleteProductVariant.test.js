import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import {
  productQueryMock, productQueryNoVariantMock,
  deleteProductVariantMutationMock
} from '../../../lib/test-utils/mocks';
import { mockVariant, mockProduct } from '../../../lib/test-utils/utils';
import { DeleteProductVariant } from '../../../components/Buttons';
import { PRODUCT_QUERY } from '../../../graphql';

const mocks = [
  { ...productQueryMock },
  { ...deleteProductVariantMutationMock },
  { ...productQueryNoVariantMock },
];


describe('<DeleteProductVariant />', () => {
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <DeleteProductVariant productId={mockProduct.id} id={mockVariant.id}>Delete</DeleteProductVariant>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('deletes variant from product by variant id', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <DeleteProductVariant productId={mockProduct.id} id={mockVariant.id}>Delete</DeleteProductVariant>;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const { data: { product } } = await apolloClient.query({ query: PRODUCT_QUERY, variables: { id: mockProduct.id } });
    expect(product.id).toBe('pr0duct1d');
    expect(product.variants.length).toBe(1);
    expect(product.variants[0].id).toBe('v4r13nt1d');
    wrapper.find('button').simulate('click');
    await wait(50);
    const { data: { product: product2 } } = await apolloClient.query({ query: PRODUCT_QUERY, variables: { id: mockProduct.id } });
    expect(product2.id).toBe('pr0duct1d');
    expect(product2.variants.length).toBe(0);
    wrapper.unmount();
  });

  it('calls postDelete if given in props', async () => {
    const postDel = jest.fn();
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <DeleteProductVariant
          productId={mockProduct.id}
          id={mockVariant.id}
          postDelete={postDel}
        >Delete</DeleteProductVariant>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    wrapper.find('button').simulate('click');
    await wait(50);
    expect(postDel).toHaveBeenCalled();
    wrapper.unmount();
  });
});
