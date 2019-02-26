import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import ProductVariants from '../../components/ProductVariants';
import {
  mockProduct, mockVariant
} from '../../lib/test-utils/mocks';

const ComponentToMock = (props) => (
  <div>A mock with '{Object.keys(props).length}' passed!</div>
);
const variants = [{
  ...mockVariant
}, {
  ...mockVariant,
  id: '4352624623',
  color: 'green',
  size: 'S',
}, {
  ...mockVariant,
  id: '84202615159781',
  color: 'white',
  size: 'L',
}, {
  ...mockVariant,
  id: '9182737465',
  color: 'green',
  size: 'L',
}];


describe('<ProductVariants />', () => {
  describe('component w/variantAction and Label', () => {
    let wrapper;
    const variantAction = jest.fn();
    beforeAll(() => {
      wrapper = mount(
        <MockedProvider mocks={[]}>
          <ProductVariants
            variants={variants}
            online={true}
            demoView={true}
            VariantActionComponent={null}
            variantAction={variantAction}
            variantActionLabel='Select'
          />
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
      expect(toJSON(wrapper.find('ProductVariants'))).toMatchSnapshot();
    });

    it('renders properly', async () => {
      expect(wrapper.find('PriceTag').length).toBe(1);
      expect(wrapper.find('PriceTag').text()).toBe('$35$30');
      expect(wrapper.find('#prod-var-sizes').length).toBe(1);
      expect(wrapper.find('#prod-var-sizes').text()).toBe('Sizes:SL');
      expect(wrapper.find('#prod-var-sizes').find('button').length).toBe(2);
      expect(wrapper.find('#prod-var-colors').length).toBe(1);
      expect(wrapper.find('#prod-var-colors').text()).toBe('White');
      expect(wrapper.find('#prod-var-colors').find('button').length).toBe(2);
      expect(wrapper.find('#prod-var-avail').length).toBe(1);
      expect(wrapper.find('#prod-var-avail').text()).toBe('4 in Stock!');
      expect(wrapper.find('#prod-var-action').length).toBe(1);
      expect(wrapper.find('VariantActionComponent').length).toBe(0);
      expect(wrapper.find('button#prod-var-action-btn').length).toBe(1);
      expect(wrapper.find('button#prod-var-action-btn').text()).toBe('Select');
    });

    it('clicking a color option changes its class', async () => {
      const buttons = wrapper.find('#prod-var-colors').find('button');
      const whiteBtnProps = buttons.at(0).props();
      const greenBtnProps = buttons.at(1).props();
      expect(whiteBtnProps.name).toBe('color');
      expect(whiteBtnProps.value).toBe('white');
      expect(whiteBtnProps.title).toBe('Select color: White');
      expect(whiteBtnProps.className).toBe('undrln-btn sample-selected');
      expect(greenBtnProps.name).toBe('color');
      expect(greenBtnProps.value).toBe('green');
      expect(greenBtnProps.title).toBe('Select color: Green');
      expect(greenBtnProps.className).toBe('undrln-btn sample-hover');
      buttons.at(1).simulate('click');
      await wait(100);
      wrapper.update();
      const buttons2 = wrapper.find('#prod-var-colors').find('button');
      expect(buttons2.at(0).props().className).toBe('undrln-btn sample-selected');
    });

    it('clicking a size option changes its class', async () => {
      const buttons = wrapper.find('#prod-var-sizes').find('button');
      const sBtn = buttons.at(0);
      const lBtn = buttons.at(1);
      expect(sBtn.text()).toBe('S');
      expect(sBtn.props().className).toBe('undrln-btn sample-selected');
      expect(lBtn.text()).toBe('L');
      expect(lBtn.props().className).toBe('undrln-btn sample-hover');
      buttons.at(1).simulate('click');
      await wait(100);
      wrapper.update();
      const buttons2 = wrapper.find('#prod-var-sizes').find('button');
      expect(buttons2.at(0).props().className).toBe('undrln-btn sample-hover');
      expect(buttons2.at(1).props().className).toBe('undrln-btn sample-selected');
    });

    it('action button clicks properly', async () => {
      const button = wrapper.find('button#prod-var-action-btn');
      expect(button.props().disabled).toBe(false);
      expect(button.text()).toBe('Select');
      expect(variantAction).not.toHaveBeenCalled();
      button.simulate('click');
      await wait(50);
      wrapper.update();
      expect(variantAction).toHaveBeenCalled();
    });
  });

  describe('component w/VariantActionComponent', () => {
    let wrapper2;
    const variantActionComponent = jest.fn();
    beforeAll(() => {
      wrapper2 = mount(
        <MockedProvider mocks={[]}>
          <ProductVariants
            variants={variants}
            online={true}
            demoView={true}
            VariantActionComponent={ComponentToMock}
            variantAction={null}
            variantActionLabel=''
          />
        </MockedProvider>
      );
    });
    afterAll(() => {
      wrapper2.unmount();
      jest.clearAllMocks();
    });

    it('renders properly', async () => {
      await wait();
      wrapper2.update();
      expect(wrapper2.find('PriceTag').length).toBe(1);
      expect(wrapper2.find('PriceTag').text()).toBe('$35$30');
      expect(wrapper2.find('#prod-var-sizes').length).toBe(1);
      expect(wrapper2.find('#prod-var-sizes').find('button').length).toBe(2);
      expect(wrapper2.find('#prod-var-colors').length).toBe(1);
      expect(wrapper2.find('#prod-var-colors').find('button').length).toBe(2);
      expect(wrapper2.find('#prod-var-avail').length).toBe(1);
      expect(wrapper2.find('#prod-var-avail').text()).toBe('4 in Stock!');
      expect(wrapper2.find('#prod-var-action').length).toBe(1);
      expect(wrapper2.find('ComponentToMock').length).toBe(1);
      expect(wrapper2.find('ComponentToMock').props().disabled).toBe(false);
      expect(wrapper2.find('ComponentToMock').props().variant).toMatchObject(mockVariant);
      expect(wrapper2.find('button#prod-var-action-btn').length).toBe(0);
    });
  });
});
