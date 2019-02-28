import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import Filter from '../../components/Filter';
import { mockProduct, shopProductsQueryFilterMock } from '../../lib/test-utils/mocks';
import { SHOP_PRODUCTS_QUERY } from '../../graphql';

const mocks = [
  shopProductsQueryFilterMock({ variables: { department: 'accessories' }, products: true }),
  shopProductsQueryFilterMock({ variables: { department: 'accessories', category: 'jewelry' }, products: true }),
  shopProductsQueryFilterMock({ variables: { department: 'accessories', category: 'bags' }, products: false }),
  shopProductsQueryFilterMock({ variables: { department: 'accessories' }, products: true }),
];
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
  prefetch: () => {},
  preventDefault: () => {}
};


describe('<Filter />', () => {
  let wrapper, apolloClient;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (
              <Filter
                pageQuery={{ department: 'accessories' }}
                products={[mockProduct]}
              />
            )
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
  });
  afterAll(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('matches the snap shot', async () => {
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('Filter'))).toMatchSnapshot();
  });

  it('renders properly', async () => {
    expect(wrapper.find('#filter-department').length).toBe(0);
    expect(wrapper.find('#filter-category').length).toBe(1);
    expect(wrapper.find('#filter-color').length).toBe(1);
    expect(wrapper.find('#filter-size').length).toBe(1);
    expect(wrapper.find('#filter-price').length).toBe(1);
    expect(wrapper.find('#filter-brand').length).toBe(1);
  });

  describe('Filter Section', async () => {
    let categFilter;
    beforeAll(() => categFilter = wrapper.find('#filter-category'));

    it('initial banner renders properly', async () => {
      const labelBtn = categFilter.find('button#filter-category-label');
      expect(labelBtn.length).toBe(1);
      expect(labelBtn.text()).toBe('CATEGORY');
      const clearBtn = categFilter.find('button#filter-clear-category-btn');
      expect(clearBtn.length).toBe(1);
      expect(clearBtn.text()).toBe('');
      const arrowBtn = categFilter.find('button#filter-show-category-btn');
      expect(arrowBtn.length).toBe(1);
      expect(arrowBtn.find('SvgIcon').props().name).toBe('downArrow');
    });

    it('clicking a filter option call properly', async () => {
      const categFilter = wrapper.find('#filter-category');
      expect(categFilter.find('button#category-jewelry').props().disabled).toBe(false);
      expect(wrapper.find('Filter').props().pageQuery.category).toBe(undefined);
      categFilter.find('button#category-jewelry').simulate('click');
      await wait();
      wrapper.find('Filter').instance().forceUpdate();
      expect(Router.router.push).toHaveBeenCalled();
      expect(Router.router.push).toHaveBeenCalledWith({
        pathname: "/shop",
        query: {
          department: 'accessories', category: 'jewelry'
        }
      });
      const { data: { products } } = await apolloClient.query({
        query: SHOP_PRODUCTS_QUERY,
        variables: {
          department: 'accessories', category: 'jewelry'
        }
      });
      expect(products.length).toBe(1);
      wrapper.update();
      expect(wrapper.find('Filter').props().pageQuery.category).toBe('jewelry');
      expect(wrapper.find('#filter-category').find('button#category-jewelry').props().disabled).toBe(true);
    });

    it('clicking a different filter option call properly', async () => {
      const categFilter = wrapper.find('#filter-category');
      expect(categFilter.find('button#category-jewelry').props().disabled).toBe(true);
      expect(categFilter.find('button#category-bags').props().disabled).toBe(false);
      expect(wrapper.find('Filter').props().pageQuery.category).toBe('jewelry');
      categFilter.find('button#category-bags').simulate('click');
      await wait();
      wrapper.find('Filter').instance().forceUpdate();
      expect(Router.router.push).toHaveBeenCalled();
      expect(Router.router.push).toHaveBeenCalledWith({
        pathname: "/shop",
        query: {
          department: 'accessories', category: 'bags'
        }
      });
      const { data: { products } } = await apolloClient.query({
        query: SHOP_PRODUCTS_QUERY,
        variables: {
          department: 'accessories', category: 'bags'
        }
      });
      expect(products.length).toBe(0);
      wrapper.update();
      expect(wrapper.find('Filter').props().pageQuery.category).toBe('bags');
      expect(wrapper.find('#filter-category').find('button#category-jewelry').props().disabled).toBe(false);
      expect(wrapper.find('#filter-category').find('button#category-bags').props().disabled).toBe(true);
    });

    it("clicking 'Clear' removes category from query properly", async () => {
      const categClearBtn = wrapper.find('button#filter-clear-category-btn');
      expect(wrapper.find('Filter').props().pageQuery.category).toBe('bags');
      expect(categClearBtn.length).toBe(1);
      expect(categClearBtn.props().disabled).toBe(false);
      expect(categClearBtn.text()).toBe('Clear');
      categClearBtn.simulate('click');
      await wait();
      wrapper.find('Filter').instance().forceUpdate();
      expect(Router.router.push).toHaveBeenCalled();
      expect(Router.router.push).toHaveBeenCalledWith({
        pathname: "/shop",
        query: {
          department: 'accessories'
        }
      });
      const { data: { products } } = await apolloClient.query({
        query: SHOP_PRODUCTS_QUERY,
        variables: {
          department: 'accessories'
        }
      });
      expect(products.length).toBe(1);
      wrapper.update();
      expect(wrapper.find('Filter').props().pageQuery.category).toBe(undefined);
      expect(wrapper.find('button#filter-clear-category-btn').props().disabled).toBe(true);
      expect(wrapper.find('button#filter-clear-category-btn').text()).toBe('');
    });

    it("clicking Arrow hides filter section", async () => {
      const categArrowBtn = categFilter.find('button#filter-show-category-btn');
      expect(wrapper.find('Filter').instance().state.showCategory).toBe(true);
      expect(categArrowBtn.length).toBe(1);
      expect(categArrowBtn.find('SvgIcon').props().name).toBe('downArrow');
      categArrowBtn.simulate('click');
      await wait();
      wrapper.update();
      expect(wrapper.find('Filter').instance().state.showCategory).toBe(false);
      expect(wrapper.find('button#filter-show-category-btn').find('SvgIcon').props().name).toBe('upArrow');
    });
  });
});
