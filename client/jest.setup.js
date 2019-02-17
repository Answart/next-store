import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.alert = jest.fn();
window.confirm = jest.fn(() => true);
window.matchMedia = () => ({});
window.scrollTo = () => { };