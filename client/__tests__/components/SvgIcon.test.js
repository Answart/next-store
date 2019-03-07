import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import SvgIcon from '../../components/SvgIcon';


describe('<SvgIcon />', () => {
  it('valid name/width renders properly', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[]}>
        <SvgIcon name="leftArrow" width={10} />
      </MockedProvider>
    );
    expect(wrapper.find('SvgIcon').props().name).toBe('leftArrow');
    expect(wrapper.find('SvgIcon').props().width).toBe(10);
    expect(wrapper.find('svg').props().width).toBe('10px');
    expect(wrapper.find('svg').props().height).toBe('10px');
    expect(wrapper.find('svg').props().viewBox).toBe('0 0 492 492');
    expect(wrapper.find('path').props().fill).toBe('#6d6c6c');
    expect(wrapper.find('path').props().d).toBe('M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z');
    wrapper.unmount();
  });

  it('valid name/color/title renders properly', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[]}>
        <SvgIcon name="leftArrow" color="darkBlue" title="Some Title" />
      </MockedProvider>
    );
    expect(wrapper.find('SvgIcon').props().name).toBe('leftArrow');
    expect(wrapper.find('SvgIcon').props().color).toBe('darkBlue');
    expect(wrapper.find('SvgIcon').props().title).toBe('Some Title');
    expect(wrapper.find('svg').props().width).toBe('100%');
    expect(wrapper.find('svg').props().height).toBe('100%');
    wrapper.unmount();
  });

  it('invalid name/width renders properly', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[]}>
        <SvgIcon name="blah" width={10} />
      </MockedProvider>
    );
    expect(wrapper.find('SvgIcon').props().name).toBe('blah');
    expect(wrapper.find('SvgIcon').props().width).toBe(10);
    expect(wrapper.find('svg').props().width).toBe('10px');
    expect(wrapper.find('svg').props().height).toBe('10px');
    expect(wrapper.find('svg').props().viewBox).toBe('0 0 32 32');
    expect(wrapper.find('path').length).toBe(0);
    wrapper.unmount();
  });
});
