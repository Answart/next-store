import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Router from 'next/router';
import Pagination from '../../components/Pagination';
import { mockPagination, mockVariant } from '../../lib/test-utils/mocks';

Router.onRouteChangeStart = jest.fn();
Router.onRouteChangeComplete = jest.fn();
Router.onRouteChangeError = jest.fn();
Router.router = {
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
  createHref: jest.fn(),
  createLocation: jest.fn(),
  isActive: jest.fn(),
  matcher: {
    match: jest.fn(),
    getRoutes: jest.fn(),
    isActive: jest.fn(),
    format: jest.fn()
  },
  addTransitionHook: jest.fn(),
  preventDefault: () => {}
};


describe('<Pagination />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <Pagination
          pathname='/shop'
          pageQuery={{}}
          currentShow={1} currentPage={2}
          currentOrderBy='name'
          results={30} count={20}
          disabled={false}
        />
      </MockedProvider>
    );
  });
  afterAll(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('snapshot matches', async () => {
    expect(toJSON(wrapper.find('[data-test="pagination"]'))).toMatchSnapshot();
  });

  describe('sort', () => {
    describe('sortBtn', () => {
      it('renders links properly', async () => {
        expect(wrapper.find('button#sortBtn').length).toBe(1);
        expect(wrapper.find('button#sortBtn').text()).toBe('Name');
        expect(wrapper.find('#sortDropdown').text()).toBe('NameNewestOldestUpdated');
        expect(wrapper.find('#sortDropdown').props().className).toBe('srt-dropdown-content');
      });

      it('clicks properly', async () => {
        wrapper.find('button#sortBtn').simulate('click');
        wrapper.update();
        expect(wrapper.find('#sortDropdown').props().className).toBe('srt-dropdown-content show');
      });
    });

    describe('showBtn', () => {
      it('renders links properly', async () => {
        expect(wrapper.find('button#showBtn').length).toBe(1);
        expect(wrapper.find('button#showBtn').text()).toBe('Show 1');
        expect(wrapper.find('#showDropdown').text()).toBe('Show 6Show 12Show 30Show 60');
        expect(wrapper.find('#showDropdown').props().className).toBe('srt-dropdown-content');
      });

      it('clicks properly', async () => {
        wrapper.find('button#showBtn').simulate('click');
        wrapper.update();
        expect(wrapper.find('#showDropdown').props().className).toBe('srt-dropdown-content show');
      });
    });
  });

  describe('pagination', () => {
    it('renders properly', async () => {
      expect(wrapper.find('#pagin-item-count').length).toBe(1);
      expect(wrapper.find('#pagin-l-arrow').length).toBe(1);
      expect(wrapper.find('#pagin-preview-pages').length).toBe(1);
      expect(wrapper.find('#pagin-r-arrow').length).toBe(1);
      expect(wrapper.find('#pagin-d-r-arrow').length).toBe(1);
    });

    it('renders properly', async () => {
      expect(wrapper.find('#pagin-item-count').text()).toBe('20 Items');
      expect(wrapper.find('#pagin-d-l-arrow').find('a').props()['aria-disabled']).toBe(false);
      expect(wrapper.find('#pagin-l-arrow').find('a').props()['aria-disabled']).toBe(false);
      expect(wrapper.find('#pagin-preview-pages').text()).toBe('1234');
      expect(wrapper.find('#pagin-r-arrow').find('a').props()['aria-disabled']).toBe(false);
      expect(wrapper.find('#pagin-d-r-arrow').find('a').props()['aria-disabled']).toBe(false);
    });
  });

  //   it('renders properly', async () => {
  //     expect(wrapper.find('Link').props().href).toMatchObject({
  //       pathname: "/shop",
  //       query: { id: mockVariant.product.id }
  //     });
  //     const details = wrapper.find('.cart-item-detail');
  //     expect(details.length).toBe(4);
  //     expect(details.at(0).text()).toBe(mockVariant.product.title);
  //     expect(details.at(1).text()).toBe(`$${mockVariant.price}$${mockVariant.salePrice}`);
  //     expect(details.at(2).text()).toBe(`Size: ${mockVariant.size}`);
  //     expect(details.at(3).text()).toBe('Color: White');
  //     const actions = wrapper.find('.cart-item-quantity-actions');
  //     expect(actions.text()).toBe('−3+Remove');
  //     expect(actions.text()).toBe(`−${mockPagination.quantity}+Remove`);
  //     const price = wrapper.find('.cart-item-total-price');
  //     expect(price.text()).toBe(`$${mockPagination.quantity * mockVariant.salePrice}`);
  //   });
});
