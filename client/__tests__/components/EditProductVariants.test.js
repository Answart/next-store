import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import EditProductVariants from '../../components/EditProductVariants';
import { mockProduct, mockVariant } from '../../lib/test-utils/mocks';


describe('<EditProductVariants />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <EditProductVariants product={{
          ...mockProduct,
          variants: [{ ...mockVariant }]
        }} />
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
    expect(toJSON(wrapper.find('EditProductVariants'))).toMatchSnapshot();
  });

  it('renders properly before selecting a variant', async () => {
    expect(wrapper.find('EditProductVariants').instance().state).toMatchObject({
      currentVariant: null,
      message: ''
    });
    expect(wrapper.find('DisplayMessage').length).toBe(1);
    expect(wrapper.find('DisplayMessage').props().success).toBe('');
    expect(wrapper.find('DisplayMessage').text()).toBe(null);
    const beforeChoose = wrapper.find('.edit-prdct-var-choose');
    expect(beforeChoose.length).toBe(1);
    expect(beforeChoose.find('.edit-prdct-lbl').text()).toBe('1. Choose Selection to Update');
    expect(beforeChoose.find('Product').length).toBe(1);
    expect(wrapper.find('.edit-prdct-var-form').length).toBe(0);
  });

  describe('2. Update Selection', () => {

    it('selecting a variant changes the instance state', async () => {
      expect(wrapper.find('EditProductVariants').instance().state).toMatchObject({
        currentVariant: null,
        message: ''
      });
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.find('EditProductVariants').instance().selectVariant(mockEvent, mockVariant);
      await wait(50);
      wrapper.update();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(wrapper.find('EditProductVariants').instance().state).toMatchObject({
        currentVariant: mockVariant,
        message: ''
      });
      jest.clearAllMocks();
    });

    it('renders properly after selecting a variant', async () => {
      expect(wrapper.find('EditProductVariants').instance().state).toMatchObject({
        currentVariant: mockVariant,
        message: ''
      });
      expect(wrapper.find('.edit-prdct-var-choose').length).toBe(0);
      const afterChoose = wrapper.find('.edit-prdct-var-form');
      expect(afterChoose.length).toBe(1);
      expect(afterChoose.find('.edit-prdct-lbl').text()).toBe('2. Update Selection');
      expect(afterChoose.find('UpdateProductVariantForm').length).toBe(1);
      expect(afterChoose.find('DeleteProductVariant').length).toBe(1);
    });

    it('UpdateProductVariantForm goBack fn calls properly', async () => {
      expect(wrapper.find('EditProductVariants').instance().state).toMatchObject({
        currentVariant: mockVariant,
        message: ''
      });
      wrapper.find('UpdateProductVariantForm').props().goBack();
      expect(wrapper.find('EditProductVariants').instance().state).toMatchObject({
        currentVariant: null,
        message: ''
      });
    });

    it('DeleteProductVariant postDelete fn calls properly', async () => {
      wrapper.find('EditProductVariants').instance().selectVariant(null, mockVariant);
      await wait(50);
      wrapper.update();
      expect(wrapper.find('EditProductVariants').instance().state).toMatchObject({
        currentVariant: mockVariant,
        message: ''
      });
      wrapper.find('DeleteProductVariant').props().postDelete();
      expect(wrapper.find('EditProductVariants').instance().state).toMatchObject({
        currentVariant: null,
        message: `Deleted selection with size '${mockVariant.size}' and color '${mockVariant.color}'.`
      });
    });
  });
});
