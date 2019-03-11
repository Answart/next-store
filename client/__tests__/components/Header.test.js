import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import Header from '../../components/Header';
import NotFound from '../../components/NotFound';
import {
  mockProduct, mockUser,
  userQueryEmptyCartMock, userQueryNoUserMock, userQueryCartItemMock,
} from '../../lib/test-utils/mocks';
import { CURRENT_USER_QUERY } from '../../graphql';

const loggedOutMocks = [{ ...userQueryNoUserMock }];
const loggedInMocks = [{ ...userQueryEmptyCartMock }];

// // Since we're not going to test the button component itself
// // we may just simulate its onClick event manually.
// const eventMock = { preventDefault: jest.fn() };
// submitButtonInstance.props.onClick(eventMock);
//
// expect(onSubmit).toHaveBeenCalledTimes(1);
// expect(onSubmit).toHaveBeenCalledWith(searchQuery);

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


describe('<Header />', () => {
  describe('when logged out', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <MockedProvider mocks={loggedOutMocks}>
          <Header />
        </MockedProvider>
      );
    });
    afterAll(() => {
      wrapper.unmount();
      jest.clearAllMocks();
    });

    it('renders with components and matches the snap shot', async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find('Search').length).toBe(1);
      expect(wrapper.find('Menu').length).toBe(1);
      expect(wrapper.find('Nav').length).toBe(1);
      expect(wrapper.find('Cart').length).toBe(1);
      expect(toJSON(wrapper.find('Header'))).toMatchSnapshot();
    });

    it('<Nav /> renders properly', async () => {
      const navLinks = wrapper.find('.hdr-nav').find('Link');
      expect(navLinks.length).toBe(7);
      expect(navLinks.at(0).props().href).toMatchObject({
        pathname: "/shop",
        query: { department: 'tops' }
      });
      expect(navLinks.at(1).props().href).toMatchObject({
        pathname: "/shop",
        query: { department: 'bottoms' }
      });
      expect(navLinks.at(2).props().href).toMatchObject({
        pathname: "/shop",
        query: { department: 'shoes' }
      });
      expect(navLinks.at(3).props().href).toMatchObject({
        pathname: "/shop",
        query: { department: 'outwear' }
      });
      expect(navLinks.at(4).props().href).toMatchObject({
        pathname: "/shop",
        query: { department: 'accessories' }
      });
      expect(navLinks.at(5).props().href).toMatchObject({
        pathname: "/shop",
        query: { department: 'decor' }
      });
      expect(navLinks.at(6).props().href).toMatchObject({
        pathname: "/shop",
        query: { department: 'wedding' }
      });
    });

    describe('<Search />', async () => {
      it('renders properly', async () => {
        expect(wrapper.find('Search').instance().state).toMatchObject({
          title: '',
        });
        expect(wrapper.find('.hdr-search-btn').text()).toBe('GO');
        expect(wrapper.find('.hdr-search-btn').props().disabled).toBe(true);
      });

      it('input behaves properly', async () => {
        wrapper.find('#search').simulate('change', { target: {
          value: mockProduct.title, name: 'title', type: 'search'
        }});
        expect(wrapper.find('Search').instance().state).toMatchObject({
          title: mockProduct.title,
        });
      });

      it('clicks properly', async () => {
        expect(wrapper.find('.hdr-search-btn').props().disabled).toBe(false);
        wrapper.find('button.hdr-search-btn').simulate('click');
        await wait(0);
        expect(Router.router.push).toHaveBeenCalled();
        expect(Router.router.push).toHaveBeenCalledWith({
          pathname: "/shop",
          query: { title: mockProduct.title }
        });
        jest.clearAllMocks();
      });
    });

    it('<Menu /> renders properly', async () => {
      const links = wrapper.find('.hdr-menu').find('Link');
      expect(links.length).toBe(1);
      expect(links.at(0).props().href).toBe('/signup');
    });
  });

  describe('when logged in', () => {
    let wrapper2, apolloClient;
    beforeAll(() => {
      wrapper2 = mount(
        <MockedProvider mocks={loggedInMocks}>
          <ApolloConsumer>
            {client => {
              apolloClient = client;
              return <Header />;
            }}
          </ApolloConsumer>
        </MockedProvider>
      );
    });
    afterAll(() => wrapper2.unmount());

    it('renders with components', async () => {
      const { data } = await apolloClient.query({ query: CURRENT_USER_QUERY });
      expect(data.me.id).toBe(mockUser.id);
      wrapper2.update();
      expect(wrapper2.find('Search').length).toBe(1);
      expect(wrapper2.find('Menu').length).toBe(1);
      expect(wrapper2.find('Nav').length).toBe(1);
      expect(wrapper2.find('Cart').length).toBe(1);
    });

    describe('<Menu />', async () => {

      it('renders properly', async () => {
        expect(wrapper2.find('ToggleCart').length).toBe(2);
        expect(wrapper2.find('CartCount').length).toBe(1);
        expect(wrapper2.find('Logout').length).toBe(1);
        expect(wrapper2.find('Menu').props().acctDrpdwn).toBe(false)
        expect(wrapper2.find('button#hdrDropdownBtn').text()).toBe(`Hi, ${mockUser.name}!`)
      });

      it('renders dropdown links', async () => {
        const links = wrapper2.find('#myDropdown').find('a');
        expect(links.length).toBe(4);
        expect(links.at(0).text()).toBe('Create Product')
        expect(links.at(0).props().href).toBe('/sell')
        expect(links.at(1).text()).toBe('My Products')
        expect(links.at(1).props().href).toBe(`/shop?name=${mockUser.name}`)
        expect(links.at(2).text()).toBe('Order History')
        expect(links.at(2).props().href).toBe('/orders')
        expect(links.at(3).text()).toBe('Sale History')
        expect(links.at(3).props().href).toBe('/sales')
      });

      // it('dropdown links work properly', async () => {
      //   const spy = jest.spyOn(wrapper2.find('#myDropdown').find('a').at(0), 'href');
      //   wrapper2.instance().forceUpdate();
      //   // wrapper2.update();
      //   const sellLink = wrapper2.find('#myDropdown').find('a').at(0);
      //   console.log('sellLink', sellLink.debug())
      //   // const eventMock = { preventDefault: jest.fn() };
      //   // sellLink.props().onClick(eventMock);
      //   sellLink.simulate('click', 1);
      //   await wait(50);
      //   wrapper2.update();
      //   expect(spy).toBeCalled();
      //   expect(sellLink).toBeCalled();
      //   // expect(sellLink).toHaveBeenCalledTimes(1);
      //   expect(Router.router.push).toHaveBeenCalled();
      //   expect(Router.router.push).toHaveBeenCalledWith({ pathname: '/sell' });
      //   expect(Router.onRouteChangeStart).toHaveBeenCalled();
      // });

      it('hdrDropdownBtn btn toggles dropdown', async () => {
        expect(wrapper2.find('Menu').props().acctDrpdwn).toBe(false);
        wrapper2.find('#hdrDropdownBtn').simulate('click');
        wrapper2.update();
        expect(wrapper2.find('Menu').props().acctDrpdwn).toBe(true)
        expect(wrapper2.find('#myDropdown').props().className).toBe('hdr-dropdown-content show');
      });

      it('renders <ToggleCart />', async () => {
        const togg = wrapper2.find('ToggleCart');
        expect(togg.length).toBe(2);
        expect(togg.find('CartCount').length).toBe(1);
        expect(togg.find('CartCount').props().count).toBe(0);
      });
    });
  });
});
