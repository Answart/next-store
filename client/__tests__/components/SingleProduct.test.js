import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import SingleProduct from '../../components/SingleProduct';
import NotFound from '../../components/NotFound';
import {
  mockProduct,
  productQueryMock, productQueryNoProductMock, productQueryErrorMock,
} from '../../lib/test-utils/mocks';
import { PRODUCT_QUERY } from '../../graphql';

const successMocks = [{ ...productQueryMock }];
const errorMocks = [{ ...productQueryNoProductMock }];
const errorMocks2 = [{ ...productQueryErrorMock }];


describe('<SingleProduct />', () => {
  afterAll(() => wrapper.unmount());

  it('renders with proper data when it returns successfully', async () => {
    const wrapper = mount(
      <MockedProvider mocks={successMocks}>
        <SingleProduct variables={{ id: mockProduct.id }}>
          {({ data, error, loading }) => {
            if (loading) return (<p>Loading...</p>);
            if (error) return (<NotFound status={400} message={error.message} />);
            const { product } = data;
            if (typeof product === 'undefined' || product === null) return (<NotFound status={404} />);
            return (<p>something goes here</p>)
          }}
        </SingleProduct>
      </MockedProvider>
    );
    expect(wrapper.text()).toContain('Loading...');
    await wait();
    wrapper.update();
    expect(wrapper.text()).not.toContain('NotFound');
    expect(wrapper.text()).toContain('something goes here');
    wrapper.unmount();
  });

  it('renders with proper data when it returns with no product', async () => {
    const wrapper = mount(
      <MockedProvider mocks={errorMocks}>
        <SingleProduct variables={{ id: "123" }}>
          {({ data, error, loading }) => {
            if (loading) return (<p>Loading...</p>);
            if (error) return (<NotFound status={400} message={error.message} />);
            const { product } = data;
            if (typeof product === 'undefined' || product === null) return (<NotFound status={404} />);
            return (<p>something goes here</p>)
          }}
        </SingleProduct>
      </MockedProvider>
    );
    expect(wrapper.text()).toContain('Loading...');
    await wait();
    wrapper.update();
    expect(wrapper.text()).not.toContain('something goes here');
    const notFound = wrapper.find('NotFound');
    expect(notFound.props().status).toBe(404);
    expect(notFound.props().message).toBe('Unable to find what you are looking for!');
    expect(notFound.text()).toBe('Not FoundUnable to find what you are looking for!Go back tohomepage.');
    wrapper.unmount();
  });

  it('renders with proper data when it returns an error', async () => {
    const wrapper = mount(
      <MockedProvider mocks={errorMocks2}>
        <SingleProduct variables={{ id: "123" }}>
          {({ data, error, loading }) => {
            if (loading) return (<p>Loading...</p>);
            if (error) return (<NotFound status={400} message={error.message} />);
            const { product } = data;
            if (typeof product === 'undefined' || product === null) return (<NotFound status={404} />);
            return (<p>something goes here</p>)
          }}
        </SingleProduct>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).not.toContain('something goes here');
    const notFound = wrapper.find('NotFound');
    expect(notFound.props().status).toBe(400);
    expect(notFound.props().message).toBe('GraphQL error: ack!');
    expect(notFound.text()).toBe('ErrorAn error occured. Please try again later.Go back tohomepage.');
    wrapper.unmount();
  });
});
