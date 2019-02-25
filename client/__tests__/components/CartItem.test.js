import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import CartItem from '../../components/CartItem';
import { mockCartItem, mockVariant } from '../../lib/test-utils/mocks';


describe('<CartItem />', () => {
  afterAll(() => wrapper.unmount());

  it('renders with proper data when loading w/out variant', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[]}>
        <CartItem id={mockCartItem.id} quantity={mockCartItem.quantity} variant={null} />
      </MockedProvider>
    );
    wrapper.update();
    expect(wrapper.find('.cart-item-details').text()).toContain('This Product has been removed');
    expect(wrapper.find('RemoveFromCart').props().id).toContain(mockCartItem.id);
    wrapper.unmount();
  });

  describe('when loading w/variant', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <MockedProvider mocks={[]}>
          <CartItem id={mockCartItem.id} quantity={mockCartItem.quantity} variant={mockVariant} />
        </MockedProvider>
      );
    });
    afterAll(() => {
      wrapper.unmount();
      jest.clearAllMocks();
    });

    it('renders all extra components properly', async () => {
      expect(wrapper.find('Link').length).toBe(1);
      expect(wrapper.find('PriceTag').length).toBe(1);
      expect(wrapper.find('UpdateCartItem').length).toBe(2);
      expect(wrapper.find('RemoveFromCart').length).toBe(1);
      expect(toJSON(wrapper.find('Header'))).toMatchSnapshot();
    });

    it('renders properly', async () => {
      expect(wrapper.find('Link').props().href).toMatchObject({
        pathname: "/shop",
        query: { id: mockVariant.product.id }
      });
      const details = wrapper.find('.cart-item-detail');
      expect(details.length).toBe(4);
      expect(details.at(0).text()).toBe(mockVariant.product.title);
      expect(details.at(1).text()).toBe(`$${mockVariant.price}$${mockVariant.salePrice}`);
      expect(details.at(2).text()).toBe(`Size: ${mockVariant.size}`);
      expect(details.at(3).text()).toBe('Color: White');
      const actions = wrapper.find('.cart-item-quantity-actions');
      expect(actions.text()).toBe('−3+Remove');
      expect(actions.text()).toBe(`−${mockCartItem.quantity}+Remove`);
      const price = wrapper.find('.cart-item-total-price');
      expect(price.text()).toBe(`$${mockCartItem.quantity * mockVariant.salePrice}`);
    });
  });
});
