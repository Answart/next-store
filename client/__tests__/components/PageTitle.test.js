import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import PageTitle from '../../components/PageTitle';


describe('<PageTitle />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MockedProvider mocks={[]}>
        <PageTitle
          page='Edit Product'
          titles={[{
              label: 'Some Title',
              href: {
                pathname: '/product/edit',
                query: {
                  name: 'answart',
                }
              }
            }, {
              label: 'Selections',
              href: {
                pathname: '/product/selections',
                query: {
                  name: 'answart',
                }
              }
            }, {
              label: 'Add Selection'
          }]}
        />
      </MockedProvider>
    );
  });
  afterAll(() => wrapper.unmount());

  it('matches the snap shot', async () => {
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('PageTitle'))).toMatchSnapshot();
  });

  it('renders properly', async () => {
    expect(wrapper.text()).toContain('Some TitleSelectionsAdd Selection');
  });
});
