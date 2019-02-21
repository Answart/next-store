import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import ProductVariantFormFields from '../../../components/Forms/ProductVariantFormFields';
import { mockImage, mockImageVariables, mockVariant } from '../../../lib/test-utils/mocks';


describe('<ProductVariantFormFields />', () => {
  let wrapper, saveToForm;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider>
        <ProductVariantFormFields mocks={[]}
          price={0} quantity={0} color='' size='' sale={true} salePrice={0} editView={false} imageIsNew={true}
          image={{
            id: mockImage.id,
            ...mockImageVariables,
            delete_token: 'delete tokeeeen'
          }}
          saveToForm={jest.fn()}
        />
      </MockedProvider>
    );
    saveToForm = wrapper.find('ProductVariantFormFields').props().saveToForm;
  });
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', async () => {
    const form = wrapper.find('ProductVariantFormFields');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it('renders initial active image', async () => {
    const img = wrapper.find('.form-imgs').find('img');
    expect(img.props().src).toEqual(mockImage.large_image_url);
    expect(img.props().alt).toEqual(mockImage.name);
  });

  describe('input changes', async () => {

    it('size select input works', async () => {
      wrapper.find('#size').simulate('change', { target: {
        value: mockVariant.size, name: 'size', type: 'select'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ size: mockVariant.size });
    });

    it('color select input works', async () => {
      wrapper.find('#color').simulate('change', { target: {
        value: mockVariant.color, name: 'color', type: 'select'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ color: mockVariant.color });
    });

    it('quantity input works', async () => {
      wrapper.find('#quantity').simulate('change', { target: {
        value: mockVariant.quantity, name: 'quantity', type: 'number'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ quantity: mockVariant.quantity });
    });

    it('price input works', async () => {
      wrapper.find('#price').simulate('change', { target: {
        value: mockVariant.price, name: 'price', type: 'number'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ price: mockVariant.price });
    });

    it('sale input works', async () => {
      wrapper.find('#sale').simulate('change', { target: {
        value: mockVariant.sale, name: 'sale', type: 'checkbox', checked: mockVariant.sale
      }});
      await wait(0);
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ sale: mockVariant.sale, salePrice: 1 });
    });

    it('salePrice input works', async () => {
      const form = wrapper.find('.form-content');
      const instance = wrapper.find('ProductVariantFormFields');
      wrapper.find('#salePrice').simulate('change', { target: {
        value: mockVariant.salePrice, name: 'salePrice', type: 'number'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ salePrice: mockVariant.salePrice });
    });

    describe('newImage inputs productImage/newImage radio buttons work', async () => {
      it('productImage inputs productImage radio button works', async () => {
        wrapper.find('#productImage').simulate('change', { target: {
          value: 'false', name: 'productImage', type: 'radio', checked: true
        }});
        await wait(0);
        wrapper.update();
        expect(saveToForm).toHaveBeenCalled();
        expect(saveToForm).toHaveBeenCalledWith({ imageIsNew: false });
      });

      it('newImage inputs productImage radio button works', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          json: () => ({
            success: true,
            message: 'Image deleted.',
          }),
        });
        wrapper.find('#newImage').simulate('change', { target: {
          value: 'true', name: 'newImage', type: 'radio', checked: true
        }});
        await wait(0);
        wrapper.update();
        expect(saveToForm).toHaveBeenCalled();
        expect(saveToForm).toHaveBeenCalledWith({ imageIsNew: true });
      });
    });

    describe('image/cloudinary upload input', async () => {
      afterEach(() => global.fetch.mockReset())

      it('fails silently if input empty', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          json: () => ({})
        });
        wrapper.find('input[type="file"]').simulate('change', { target: {
          files: [], name: 'upload', type: 'file'
        }});
        await wait(0);
        expect(global.fetch).not.toHaveBeenCalled();
        expect(saveToForm).not.toHaveBeenCalled();
      });

      it('returns alert message when cloudinary upload fails', async () => {
        console.error = jest.fn();
        // mock the global fetch API (invalid res cloudinary)
        global.fetch = jest.fn().mockResolvedValue({
          json: () => ({
            public_id: mockImage.cloudinary_id,
            original_filename: mockImage.name,
            secure_url: mockImage.image_url,
          }),
        });
        wrapper.find('input[type="file"]').simulate('change', { target: {
          files: [mockImage.image_url], name: 'upload', type: 'file'
        }});
        await wait(0);
        expect(global.fetch).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith("Error creating image file in cloudinary uploadImageFile. TypeError: Cannot read property 'length' of undefined");
        expect(window.alert).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('An error occured while uploading image. Please try again later.');
        expect(saveToForm).not.toHaveBeenCalled();
      });

      describe('successful file upload', async () => {
        beforeEach(() => {
          // mock the global fetch API (cloudinary)
          global.fetch = jest.fn().mockResolvedValue({
            json: () => ({
              public_id: mockImage.cloudinary_id,
              original_filename: mockImage.name,
              secure_url: mockImage.image_url,
              delete_token: 'delete tokeeeen',
              eager: [{
                height: mockImage.height,
                width: mockImage.width,
                transformation: mockImage.transformation,
                secure_url: mockImage.large_image_url,
              }]
            }),
          });
          wrapper.find('input[type="file"]').simulate('change', { target: {
            files: [mockImage.image_url], name: 'upload', type: 'file'
          }});
        });

        it('uploads file to cloudinary and saves returned image to form', async () => {
          await wait(0);
          expect(global.fetch).toHaveBeenCalled();
          expect(saveToForm).toHaveBeenCalled();
        });

        it('calls cloudinary to delete previous image if replacing an already uploaded image', async () => {
          await wait(0);
          wrapper.find('input[type="file"]').simulate('change', { target: {
            files: ['anotherfile.png'], name: 'upload', type: 'file'
          }});
          await wait(0);
          expect(global.fetch).toHaveBeenCalled();
          expect(saveToForm).toHaveBeenCalled();
        });
      });
    })
  });
});
