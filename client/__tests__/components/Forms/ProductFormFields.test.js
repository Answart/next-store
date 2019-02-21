import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import ProductFormFields from '../../../components/Forms/ProductFormFields';
import { createImageMutationErrorMock } from '../../../lib/test-utils/mocks';
import { mockUser, mockImage, mockProduct } from '../../../lib/test-utils/utils';

const mocks = [
  { ...createImageMutationErrorMock },
];

describe('<ProductFormFields />', () => {
  let wrapper, saveToForm;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider>
        <ProductFormFields mocks={mocks}
          title="" userName={mockUser.name} department="" description="" category="" brand="" online={false}
          image={{
            cloudinary_id: 'cloudinary_idcloudinary_id',
            name: 'namename',
            height: 33,
            width: 22,
            transformation: '',
            image_url: 'image_urlimage_url.png',
            large_image_url: 'large_image_urllarge_image_url.png',
            delete_token: 'delete tokeeeen'
          }}
          saveToForm={jest.fn()}
        />
      </MockedProvider>
    );
    saveToForm = wrapper.find('ProductFormFields').props().saveToForm;
  });
  afterAll(() => wrapper.unmount());
  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', async () => {
    const form = wrapper.find('ProductFormFields');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it('renders the ByCreator component', async () => {
    const byCreator = wrapper.find('ByCreator');
    expect(byCreator.text()).toEqual(`By${mockUser.name}`);
    expect(byCreator.props().name).toEqual(mockUser.name);
    expect(byCreator.props().online).toEqual(true);
  });

  describe('input changes', async () => {

    it('title input works', async () => {
      wrapper.find('#title').simulate('change', { target: {
        value: mockProduct.title, name: 'title'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ title: mockProduct.title });
    });

    it('department select input works', async () => {
      wrapper.find('#department').simulate('change', { target: {
        value: mockProduct.department, name: 'department', type: 'select'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ department: mockProduct.department, category: '' });
    });

    it('category select input works', async () => {
      wrapper.find('#category').simulate('change', { target: {
        value: mockProduct.category, name: 'category', type: 'select'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ category: mockProduct.category });
    });

    it('description input works', async () => {
      wrapper.find('#description').simulate('change', { target: {
        value: mockProduct.description, name: 'description'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ description: mockProduct.description });
    });

    it('brand input works', async () => {
      wrapper.find('#brand').simulate('change', { target: {
        value: mockProduct.brand, name: 'brand'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ brand: mockProduct.brand });
    });

    it('status inputs online/offline radio button work', async () => {
      wrapper.find('#online').simulate('change', { target: {
        value: mockProduct.online, name: 'online', type: 'radio'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ online: !mockProduct.online });
      wrapper.find('#offline').simulate('change', { target: {
        value: mockProduct.online, name: 'offline', type: 'radio'
      }});
      wrapper.update();
      expect(saveToForm).toHaveBeenCalled();
      expect(saveToForm).toHaveBeenCalledWith({ online: mockProduct.online });
    });

    describe('image/cloudinary upload input', async () => {
      afterEach(() => global.fetch.mockReset())

      it('fails silently if input empty', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          json: () => ({})
        });
        wrapper.find('input[type="file"]').simulate('change', { target: {
          files: [], name: 'image', type: 'file'
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
          files: [mockImage.image_url], name: 'image', type: 'file'
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
            files: [mockImage.image_url], name: 'image', type: 'file'
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
            files: ['anotherfile.png'], name: 'image', type: 'file'
          }});
          await wait(0);
          expect(global.fetch).toHaveBeenCalled();
          expect(saveToForm).toHaveBeenCalled();
        });
      });
    })
  });
});
