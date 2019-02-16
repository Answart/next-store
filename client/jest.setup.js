import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.alert = (msg) => {
  if (msg) console.log(msg);
};
window.matchMedia = () => ({});
window.scrollTo = () => { };
